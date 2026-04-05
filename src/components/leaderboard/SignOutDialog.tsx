import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';

/** How the athlete wants to leave the leaderboard. */
type SignOutMode = 'soft' | 'hard';

interface SignOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called when sign-out completed successfully. */
  onSuccess: () => void;
  /** Called when sign-out failed; receives a human-readable error message. */
  onError: (message: string) => void;
}

/**
 * Two-step "Leaderboard verlassen" dialog.
 *
 * Step 1 — The athlete picks their preferred sign-out mode via a radio group:
 *   - soft (default): deauthorize app, keep historical results
 *   - hard: deauthorize app AND delete all results
 *
 * Step 2 — The athlete clicks "Bestätigen".  While the API call is in flight
 * both buttons are disabled and a spinner is shown.  On success the parent's
 * `onSuccess` callback is invoked; on failure `onError` is called with the
 * error message.
 */
export const SignOutDialog = ({
  open,
  onOpenChange,
  onSuccess,
  onError,
}: SignOutDialogProps) => {
  const [mode, setMode]       = useState<SignOutMode | ''>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await api.signOut(mode === 'hard'); // 'soft' and '' both treated as soft sign-out
      onOpenChange(false);
      onSuccess();
    } catch (err) {
      onOpenChange(false);
      onError(err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Leaderboard verlassen</AlertDialogTitle>
          <AlertDialogDescription className="text-foreground">
            Ich will nicht mehr an Leaderboard teilnehmen...
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Sign-out mode selection */}
        <RadioGroup
          value={mode}
          onValueChange={(value) => setMode(value as SignOutMode | '')}
          className="gap-4 py-2"
        >
          {/* Soft sign-out — default */}
          <div className="flex items-start gap-3">
            <RadioGroupItem value="soft" id="signout-soft" className="mt-0.5" />
            <Label htmlFor="signout-soft" className="cursor-pointer font-normal leading-snug">
              aber meine bisherigen Ergebnisse sollen erhalten bleiben
            </Label>
          </div>

          {/* Hard sign-out */}
          <div className="flex items-start gap-3">
            <RadioGroupItem value="hard" id="signout-hard" className="mt-0.5" />
            <Label htmlFor="signout-hard" className="cursor-pointer font-normal leading-snug">
              und alle meine Daten (inkl. Ergebnisse) sollen <b>permanent</b> gelöscht werden
            </Label>
          </div>
        </RadioGroup>

        <AlertDialogFooter>
          {/* Cancel — disabled while the request is in flight */}
          <AlertDialogCancel disabled={isLoading}>Abbrechen</AlertDialogCancel>

          {/* Confirm — shows spinner during API call */}
          <Button
            variant="destructive"
            disabled={isLoading || mode === ''}
            onClick={handleConfirm}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Bitte warten…
              </>
            ) : (
              'Bestätigen'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

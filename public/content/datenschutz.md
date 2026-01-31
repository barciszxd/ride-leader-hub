# Datenschutzerklärung

## 1. Überblick und Verantwortlicher

### Allgemeine Hinweise

Die folgenden Hinweise geben einen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie an der CORA-Leaderboard teilnehmen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.

**Verantwortlicher für die Datenverarbeitung:**

Die Datenverarbeitung erfolgt durch CORA Coburger Radsport e.V. Kontaktdaten finden Sie im Impressum dieser Website.

### Zweck der Anwendung

Die CORA-Leaderboard ist eine Webanwendung für Mitglieder des Radsportvereins CORA Coburger Radsport e.V. Sie ermöglicht die Dokumentation und Bewertung sportlicher Leistungen auf ausgewählten STRAVA-Segmenten. Die App dient zur jährlichen Ermittlung der besten Bergfahrer und Sprinter des Vereins.

Die Teilnahme ist vollständig freiwillig und erfordert eine aktive Verbindung Ihres STRAVA-Kontos mit dieser Anwendung.

## 2. Erhobene Daten und deren Speicherung

### 2.1 Profilbasierte Daten (beim Verbinden des STRAVA-Kontos)

Wenn Sie Ihr STRAVA-Konto mit dieser Anwendung verbinden, werden folgende Daten von STRAVA abgerufen und in unserer Datenbank gespeichert:

-   **Vorname und Nachname**: Zur Anzeige in der Leaderboard und zur Identifikation
-   **Geschlecht**: Für die Klassifizierung und Auswertung der Leistungen
-   **Körpergewicht**: Für mögliche gewichtsbezogene Analysen und Vergleiche
-   **STRAVA-ID**: Zur eindeutigen Zuordnung des Kontos und zum Abruf Ihrer Aktivitäten

Das STRAVA-Profilbild wird nur Ihnen persönlich angezeigt und **nicht** in unserer Datenbank gespeichert. Es wird jeweils ad-hoc direkt von STRAVA abgerufen.

### 2.2 Aktivitäts- und Segment-Daten

Wenn Sie während einer Aktivität auf STRAVA ein aktives Herausforderung-Segment (Berg- oder Sprintsegment) absolvieren, werden folgende Daten in unserer Datenbank gespeichert:

-   **STRAVA-Activity-ID**: Die eindeutige Kennung der Aktivität
-   **STRAVA-Effort-ID**: Die eindeutige Kennung der Leistung
-   **STRAVA-Segment-ID**: Die eindeutige Kennung des absolvierten Segments
-   **Startzeitstempel**: Der exakte Zeitpunkt, zu dem Sie das Segment begonnen haben
-   **Durchschnittliche leistung (W)**: Die Leistung, die Sie während des Segments ausgebraucht haben (nur bei Verwendung eines Powermeters)
-   **Verstrichene Zeit**: Die Zeit, die Sie zur Absolvierung des Segments benötigt haben
-   **STRAVA-Benutzer-ID**: Zur Zuordnung der Leistung zu Ihrem Profil

Diese Daten werden nur erfasst, wenn:

-   Das Segment auf der Liste der aktiven Herausforderungssegmente für den aktuellen Zeitraum eingetragen ist
-   Der Startzeitstempel innerhalb des definierten Herausforderungszeitraums liegt
-   Die Aktivität ebenfalls innerhalb dieses Zeitraums veröffentlicht wurde

Alle weiteren Rohdaten zur Aktivität (z.B. genaue GPS-Tracks, detaillierte Telemetrie) werden **nicht** gespeichert.

### 2.3 Aktualisierung der Daten

Wenn Sie ein Profil-Attribut (Name, Geschlecht, Gewicht) auf STRAVA ändern, wird diese Änderung automatisch von unserer Anwendung erkannt, abgerufen und in unserer Datenbank aktualisiert.

## 3. Speicherort und Sicherheit

Ihre Daten werden bei **Supabase** (https://supabase.com) gehostet, das die Daten auf AWS-Infrastruktur in **Frankfurt, Deutschland** (Region eu-central-1) speichert. Dies stellt sicher, dass Ihre Daten innerhalb der Europäischen Union verbleiben und unter europäischem Datenschutzrecht stehen.

Supabase implementiert Sicherheitsmaßnahmen zum Schutz Ihrer Daten vor Verlust, Missbrauch und unbefugtem Zugriff.

## 4. Speicherdauer

Ihre Daten werden **für unbegrenzte Zeit** in unserer Datenbank gespeichert, solange Sie:

-   Mitglied von CORA Coburger Radsport e.V. sind UND
-   Ihr STRAVA-Konto mit dieser Anwendung verbunden haben

**Ausnahme und Löschung**: Sie können alle gespeicherten Daten jederzeit sofort und vollständig löschen, indem Sie die Verbindung zum STRAVA-Konto deauthorisieren (trennen). Die Deauthorisierung führt zur **unmittelbaren und vollständigen Löschung** aller Ihre Daten aus unserer Datenbank.

## 5. Ihre Datenschutzrechte

### 5.1 Auskunftsrecht

Sie haben das Recht, jederzeit eine vollständige, maschinenlesbaren Kopie aller Daten, die wir über Sie speichern, zu erhalten. Diese Auskunft wird kostenfrei bereitgestellt.

### 5.2 Recht auf Berichtigung

Sie können Ihre Daten korrigieren, indem Sie diese in Ihrem STRAVA-Profil ändern. Unsere Anwendung wird diese Änderungen automatisch erkennen und aktualisieren.

### 5.3 Recht auf Löschung

Sie können all Ihre Daten jederzeit sofort und vollständig selbst löschen, indem Sie die Verbindung zum STRAVA-Konto mit dieser Anwendung deauthorisieren (trennen). Dies führt zur **unmittelbaren und vollständigen Löschung** aller Daten, die wir über Sie gespeichert haben. Eine weitere Anfrage oder Aktion ist nicht notwendig.

### 5.4 Kontakt für Datenschutzanfragen

Für alle Anfragen bezüglich Ihrer personenbezogenen Daten (Auskunft, Berichtigung, Löschung) oder für Anliegen zum Datenschutz kontaktieren Sie bitte den Verantwortlichen unter der im Impressum angegebenen Adresse.

Sie haben zudem das Recht, sich bei einer Datenschutzbehörde zu beschweren.

## 6. Beendigung der Datenverarbeitung

Wenn Sie die Verbindung Ihres STRAVA-Kontos mit dieser Anwendung deauthorisieren (trennen), werden **alle Ihre Daten sofort und vollständig gelöscht**. Dies umfasst:

-   Alle Profildaten (Name, Geschlecht, Gewicht)
-   Alle gespeicherten Segment-Leistungsdaten
-   Alle Referenzen zu Ihrem Konto

Diese Löschung ist sofort wirksam. Es ist keine weitere Aktion oder Anfrage erforderlich.

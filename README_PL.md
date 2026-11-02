# Quiz preferencji FiBM — publikacja na GitHub Pages

Pakiet zawiera statyczną stronę internetową: nie wymaga serwera, bazy danych ani instalowania bibliotek. Odpowiedzi są przechowywane wyłącznie w pamięci bieżącej karty przeglądarki. Po odświeżeniu lub zamknięciu karty znikają.

## Zawartość pakietu

- `index.html` — struktura strony,
- `style.css` — wygląd mobilny i komputerowy,
- `app.js` — pytania, nawigacja i obliczanie wyniku,
- `.nojekyll` — informacja dla GitHub Pages, aby publikować pliki bez dodatkowego przetwarzania.

## Publikacja na GitHub Pages — krok po kroku

### 1. Utwórz konto lub zaloguj się

Wejdź na [github.com](https://github.com/) i zaloguj się. Jeśli nie masz konta, wybierz **Sign up** i przejdź rejestrację.

### 2. Utwórz nowe repozytorium

1. W prawym górnym rogu wybierz znak **+**, a następnie **New repository**.
2. W polu **Repository name** wpisz np. `quiz-fibm`.
3. Wybierz **Public**. GitHub Pages w bezpłatnym planie najprościej działa dla publicznego repozytorium.
4. Nie zaznaczaj dodawania pliku README ani innych plików startowych.
5. Kliknij **Create repository**.

### 3. Wgraj pliki quizu

1. Na stronie nowego repozytorium wybierz **uploading an existing file**. Jeżeli repozytorium nie jest puste, wybierz **Add file → Upload files**.
2. Rozpakuj otrzymany plik ZIP na komputerze.
3. Przeciągnij do okna GitHuba **zawartość folderu `fibm-quiz`**, czyli pliki `index.html`, `style.css`, `app.js`, `.nojekyll` i opcjonalnie `README_PL.md`. Pliki muszą znajdować się w głównym katalogu repozytorium, a nie w dodatkowym podfolderze.
4. W polu opisu wpisz np. `Dodanie quizu FiBM`.
5. Kliknij **Commit changes**.

### 4. Włącz GitHub Pages

1. W repozytorium otwórz zakładkę **Settings**.
2. W menu po lewej wybierz **Pages**.
3. W części **Build and deployment**, przy **Source**, wybierz **Deploy from a branch**.
4. Przy **Branch** wybierz `main` oraz folder `/ (root)`.
5. Kliknij **Save**.

Publikacja zwykle trwa od kilkudziesięciu sekund do kilku minut. Po odświeżeniu strony ustawień pojawi się adres podobny do:

`https://nazwa-uzytkownika.github.io/quiz-fibm/`

### 5. Sprawdź stronę przed zajęciami

1. Otwórz otrzymany adres na komputerze i telefonie.
2. Przejdź wszystkie 12 pytań.
3. Sprawdź przyciski **Wstecz**, **Wróć do odpowiedzi** i **Wypełnij ponownie**.
4. Sprawdź stronę także w sieci Wi-Fi dostępnej w sali.
5. Dopiero z działającego adresu wygeneruj kod QR do prezentacji.

## Jak później zmienić pytania

Treść 12 pytań znajduje się na początku pliku `app.js`, w tablicy `questions`. Każde pytanie zawiera:

- `section` — nazwę części,
- `a` — zadanie odpowiadające perspektywie finansowej,
- `b` — zadanie odpowiadające perspektywie biznesowej.

Po zmianie pliku w GitHubie zapisz go przyciskiem **Commit changes**. GitHub Pages automatycznie opublikuje nową wersję po kilku minutach.

## Sposób liczenia wyniku

- odpowiedź 1: zdecydowana preferencja zadania A (finanse),
- odpowiedź 2: umiarkowana preferencja zadania A,
- odpowiedź 3: oba zadania interesują w podobnym stopniu,
- odpowiedź 4: umiarkowana preferencja zadania B (biznes),
- odpowiedź 5: zdecydowana preferencja zadania B.

Suma mieści się w zakresie 12–60, a średnia w zakresie 1–5. Umowne progi dydaktyczne:

- 1,00–2,49: bliżej perspektywy finansowej,
- 2,50–3,50: profil mieszany,
- 3,51–5,00: bliżej perspektywy biznesowej.

Quiz osobno pokazuje liczbę odpowiedzi neutralnych. Jeżeli co najmniej 6 z 12 odpowiedzi ma wartość 3, komunikat wyniku podkreśla podobne zainteresowanie obiema perspektywami. Progi nie są walidowaną skalą psychometryczną — mają wyłącznie charakter dydaktyczny.

## Prywatność

Strona nie zawiera backendu, formularza wysyłającego dane, plików cookies ani narzędzi analitycznych. GitHub jako operator usługi hostingowej może jednak prowadzić własne techniczne logi dostępu zgodnie ze swoją polityką. Sam quiz nie odczytuje ani nie zapisuje tych danych.

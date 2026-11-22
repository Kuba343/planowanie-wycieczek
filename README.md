Skład grupy: Jakub Szklarz, Patryk Osiecki
Wybór projektu: Planowanie wycieczek grupowych

1.Cel projektu
Naszym celem jest stworzenie aplikacji webowej, która ułatwi grupie znajomych ogarnięcie wspólnego wyjazdu – od pierwszego pomysłu aż po dopięcie listy uczestników. Użytkownicy zakładają konta, dodają znajomych i tworzą wycieczki (od zera lub na bazie gotowych szablonów z rozpisanym planem dnia). Organizator ustala limit miejsc i termin na decyzję, zaprasza wybrane osoby, a każdy zaproszony widzi plan wyjazdu, deklaruje swój udział i widzi cenę na osobę.

2.Zakres aplikacji
-Rejestracja konta, logowanie i wylogowanie z użyciem adresu e-mail oraz hasła. Każdy użytkownik ustala unikalną nazwę widoczną w aplikacji.
-Wyszukiwanie użytkowników po nazwie, wysyłanie i obsługa zaproszeń do znajomych oraz przeglądanie listy znajomych.
-Przeglądanie gotowych szablonów wycieczek. Szablon zawiera opis, kategorię, sugerowane miejsce, zdjęcie, grupę docelową i plan dzień po dniu.
-Tworzenie wycieczki od zera albo z szablonu, a następnie edycja i usuwanie własnej.
-Zapraszanie znajomych do wycieczki. Zaproszony użytkownik może je zaakceptować albo odrzucić.
-Zarządzanie uczestnikami: limit miejsc, termin potwierdzenia udziału, status deklaracji.
-Wyświetlanie własnych wycieczek, wysłanych i otrzymanych zaproszeń, listy uczestników oraz planu wyjazdu.
-Sortowanie wycieczek według daty w kolejności rosnącej i malejącej oraz filtrowanie po nazwie, miejscu lub kategorii.

3. Struktura danych
-Trip: wycieczka {
•	  id: number;
•	  name: string;
•	  destination: string;
•	  description: string;
•	  startDate: Date;
•	  endDate: Date;
•	  pricePerPerson: number; - szacowany koszt wycieczki dla jednej osoby
•	  maxParticipants: number;
•	  confirmationDeadline: Date;
•	  category: TripCategory;
•	  participants: TripParticipant[];
•	  days: TripDay[];}

-TripCategory : kategoria wycieczki {
•	  id: number;
•	  name: string; - kategorie typu zwiedzanie, odpoczynek, wysiłek}

-TripParticipant : uczestnik wycieczki {
•	  userId: number;
•	  username: string;
•	  participationStatus: string;}

-TripDay: dzień planu wycieczki lub dzień w szablonie {
•	id: number;
•	dayNumber: number; 
•	date?: Date;
•	title: string;
•	 activities: Activity[]; - lista aktywności zaplanowanych na ten dzień;
•	tripId?: number; - identyfikator wycieczki, jeśli dzień należy do konkretnej;
•	templateId?: number; - identyfikator szablonu, jeśli dzień należy do szablonu.}

-Activity: aktywność w planie dnia{
•	  title: string;
•	  location: string;
•	  description: string;
•	    estimatedDurationMinutes: number;}

-TripTemplate : szablon wycieczki
•	id: number;
•	name: string; - nazwa, np. „Weekend w górach”
•	description: string;
•	destination: string;
•	targetGroup: string; - grupa, dla której jest propozycja, np. „początkujący turyści”
•	imageUrl: string; - zdjęcie miejsca które odwiedzimy
•	category: TripCategory;
•	days: TripDay[]; - przykładowy plan poszczególnych dni.

-User: użytkownik aplikacji {
•	id: number;
•	username: string;
•	email: string;
•	createdAt: Date;}
-FriendRequest: zaproszenie do znajomych {
•	id: number;
•	senderId: number;
•	receiverId: number;
•	status: string;
•	createdAt: Date;
•	respondedAt?: Date;}

4. Statusy uczestnictwa
pole / status	/znaczenie
Status uczestnictwa:   invited	              Wysłano zaproszenie, uczestnik jeszcze nie odpowiedział.
Status uczestnictwa:   interested	            Użytkownik jest zainteresowany, ale nie potwierdził jeszcze udziału.
Status uczestnictwa:   confirmed	            Użytkownik zadeklarował udział.
Status uczestnictwa:   declined / cancelled	  Użytkownik odrzucił zaproszenie albo zrezygnował po jego przyjęciu.

5.Walidacja i reguły biznesowe
-Nazwa użytkownika jest wymagana, ma ustaloną długość i nie może być już zajęta.
-Adres e-mail musi mieć poprawny format; hasło spełnia minimalne wymagania bezpieczeństwa serwera.
-Nazwa i miejsce wycieczki są wymagane; cena i zaliczka nie mogą być ujemne.
-Data zakończenia musi przypadać po dacie rozpoczęcia; termin potwierdzenia nie może być późniejszy od rozpoczęcia wyjazdu.
-Limit uczestników musi być dodatni; nowych potwierdzeń nie przyjmuje się po osiągnięciu limitu.
-Tylko organizator może edytować i usuwać własną wycieczkę oraz odnotować wpłatę. Uczestnik może zmienić własną odpowiedź na zaproszenie.

6. Planowane funkcjonalności do implementacji

Nr	Funkcjonalność	Rezultat dla użytkownika
1	Rejestracja, logowanie, wylogowanie	Indywidualne konto i dostęp do funkcji po zalogowaniu.
2	Profil i wyszukiwanie użytkowników	Wyszukanie konta po unikalnej nazwie.
3	Zaproszenia i lista znajomych	Wysłanie, akceptacja lub odrzucenie zaproszenia.
4	Szablony wycieczek	Przeglądanie szablonów ze zdjęciem, grupą docelową i planem dnia.
5	CRUD wycieczek	Tworzenie, odczyt, edycja i usuwanie własnych wycieczek.
6	Plan dnia	Dodawanie, edycja i usuwanie dni oraz aktywności.
7	Zaproszenia na wycieczkę	Zapraszanie znajomych i odpowiadanie na zaproszenia.
8	Statusy i zaliczki	Zainteresowany / potwierdzony / rezygnacja oraz odnotowanie zaliczki.
9	Sortowanie i filtrowanie	Sortowanie daty w obu kierunkach oraz wyszukiwanie wycieczek.
10	Podsumowanie kosztów	Koszt na osobę, wymagana zaliczka i suma odnotowanych wpłat.


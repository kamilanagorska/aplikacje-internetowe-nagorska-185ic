### Laboratorium 2 i Laboratorium 3 w jednym projekcie

[Opis laboratorium 2](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/tree/main/Laboratorium2oraz3#laboratorium-2)

[Opis Laboratorium 3](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/tree/main/Laboratorium2oraz3#laboratorium-3)

### Laboratorium 2
Stronka umożliwiająca zalogowanie się użytkownikowy, wylogowanie, zmianę hasła, reset hasła w przypadku jego zapomnienia i utworzenie nowego konta. Dodatkowo wstawiłam ją na Heroku.

[Link](https://myforum-nagorska.herokuapp.com/)

#### Strona główna
![1](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/1.png?raw=true)

Po wejściu na stronę główną, mamy tutaj wiadomość, że nie jesteśmy zalogowani. Możemy zalogować się, jeśli posiadamy konto lub utworzyć zupełnie nowego użytkownika. 

#### Log in
![8](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/8.png?raw=true)

Istniejący już użytkownicy mają możliwość zalogowania się wchodząć w podstronę "Log in". Wpisujemy tutaj nazwę użytkownika i hasło. Po udanym logowaniu na moje konto administratora (kamila), wyświetla się napis "Welcome back, kamila!!!". 

![9](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/9.png?raw=true)

#### Log out
Zalogowany użytkownik ma oczywiście możliwość wylogowania się ze strony wciskając opcję "Log out". Po wylogowaniu wyświetla nam się strona główna.

![10](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/10.png?raw=true)

#### Sign up 
![2](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/2.png?raw=true)

Po wejściu w "Sign up" wyświetla nam się formularz, gdzie należy wpisać nazwę nowego użytkownika i hasło. Wykorzystałam tutaj UserCreationForm. Oczywiście niemożliwe jest utworzenie użytkownika o istniejącej już nazwię, np. u mnie mam już użytkowników, mateusz, kamila i katarzyna, więc jeśli spróbuję utworzyć ponownie konto o nazwie mateusz, strona nie pozwoli mi na to. 

Lista użytkowników:

![3](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/3.png?raw=true)

Nieudana próba utworzenia użytkownika mateusz (kiedy już taki istnieje):

![4](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/4.png?raw=true)

Utwórzmy teraz użytkownika o nazwie robert:

![5](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/5.png?raw=true)

Po utworzeniu konta, strona przekierowuje nas do podstrony 'Log in'. Wpisujemy tu dane logowania naszego nowego użytkownika.

![6](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/6.png?raw=true)

Logowanie powiodło się!

![7](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/7.png?raw=true)

Nowo utworzony użytkownik znajduje się również na liście użytkowników widocznej dla administratora:

![19](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/19.png?raw=true)

#### Change Password
Po zalogowaniu użytkownik ma możliwość zmieny swojego hasła. By to zrobić należy wejść w podstronę "Change Password". 

![11](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/11.png?raw=true)

Wpisujemy tutaj stare hasło raz i nowe hasło dwa razy. Nowe hasło musi spełnić pewne warunki, by zmiana hasła się powiodła, inaczej wyświetlony zostanie błąd. Warunki są wypisane przed polem do wpisywania nowego hasła drugi raz. Po wpisaniu haseł i wciśnięciu opcji "Change". Pojawia się podstrona z komunikatem, że nasze hasło zostało pomyślnie zmienione. Przy następnym logowaniu musimy użyć już tego zmienionego hasła.

![12](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/12.png?raw=true)

#### Reset Password
W przypadku zapomnienia hasła przez użytkownika należy wcisnąć "Forgotten password?" na stronie z logowaniem. 

![13](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/13.png?raw=true)

Przejdziemy wtedy do podstrony umożliwiającej nam wpisanie e-maila, na którego wysłany ma zostać link do resetu hasła. W moim przypadku to gdyniakan@op.pl. 

![14](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/14.png?raw=true)

Po wciśnięciu "Send e-mail" przechodzimy na stronę z informacją, że mail został do nas wysłany. 

![15](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/15.png?raw=true)

Jako że użyty miał zostać ConsoleBackend, mail został "wysłany" do mojej konsoli. (Działa to tylko na serwerze na moim komputerze, na Heroku nic nie jest wysyłane) Wysłana wiadomość wygląda następująco:

![16](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/16.png?raw=true)

Mamy tutaj link, który po skopiowaniu i wklejeniu w przeglądarkę umożliwia nam wpisanie naszego nowego hasła.

![17](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/17.png?raw=true)

Po wpisaniu nowego hasła dwa razy (oczywiście tak samo jak w przypadku zmiany hasła, czy tworzeniu nowego użytkownika, hasło musi spełniać konkretne warunki) wyświetla nam się strona z potwierdzeniem, że nasze hasło zostało zresetowane. Można teraz zalogować się na konto za pomocą nowego hasła.

![18](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/18.png?raw=true)


### Laboratorium 3
Uwierzytelnianie przez social media (Facebook i GitHub) i za pomocą wbudowanych backendów (username lub email). Dodatkowo dodałam stronę na heroku.

[Link]()

#### Log In
[!20](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/20.png?raw=true)

Po wejściu na podstronę z logowaniem pojawiają nam się dwie dodatkowe opcje, których wcześniej nie było. Mamy możliwość zalogowanie się za pomocą Facebooka lub GitHuba.

#### Login with Facebook
Wciskając opcję "Login with Facebook" przekierowani zostajemy do strony Facebooka, gdzie jesteśmy zapytani, czy chcemy połączyć nasze konto z tą aplikacją. (Jeśli nie jesteśmy zalogowani na Facebooku w danej przeglądarce, najpierw zostaniemy przekierowani do tradycyjnego okna Facebooka z logowaniem.)

[!21](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/21.png?raw=true)

Po potwierdzeniu, wracamy na MyForum i widzimi, że zalogowanie powiodło się.

[!22](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/22.png?raw=true)

Użytkownika zalogowanego przez Facebooka można teraz zobaczyć na liście użytkowników widocznej dla administratora.

[!23](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/23.png?raw=true)

#### Login with Github
Wybierając opcję "Login with Github" pojawia nam się takie okno:

[!24](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/24.png?raw=true)

Po zatwierdzeniu zostajemy przekierowani na stronę główną MyForum i jesteśmy zalogowani kontem GitHub. 

[!25](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/25.png?raw=true)

Konto to, tak samo jak konto z Facebooka, jest teraz widoczne na liście użytkowników:

[!26](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/26.png?raw=true)

#### Sign Up with E-mail Adress
Gdy wejdziemy w Sign Up, na dole dodana została opcja "Sing Up with E-mail Adress", gdy ją wciśniemy pojawia nam się formularz, który umożliwia nam utworzenie konta z użyciem adresu e-mail.

[!27](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/27.png?raw=true)

Wpisujemy tu swoje dane i hasło.

[!28](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/28.png?raw=true)

Po wciśnięciu "Sign Up" wyświetla nam się komunikat, że nasze konto zostało utworzone. Teraz można przejść do podstrony "Log In", by się zalogować. 

[!29](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/29.png?raw=true)

Logowanie teraz może odbyć się za pomocą wpisania adresu e-mail lub nazwy użytkownika.

Logowanie wpisując e-mail:
[!30](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/30.png?raw=true)
[!31](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/31.png?raw=true)

Logowanie wpisując nazwę użytkownika:
[!32](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/32.png?raw=true)
[!33](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/33.png?raw=true)

Nowo utworzony użytkownik znajduje się na liście użytkowników:
[!34](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2oraz3/screenshots/34.png?raw=true)










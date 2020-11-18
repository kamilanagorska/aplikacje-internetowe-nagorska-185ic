### Laboratorium 2
Stronka umożliwiająca zalogowanie się użytkownikowy, wylogowanie, zmianę hasła, reset hasła w przypadku jego zapomnienia i utworzenie nowego konta. Dodatkowo wstawiłam ją na Heroku.

[Link](https://myforum-nagorska.herokuapp.com/)

#### Strona główna
![1](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2/screenshots/1.png?raw=true)

Po wejściu na stronę główną, mamy tutaj wiadomość, że nie jesteśmy zalogowani. Możemy zalogować się, jeśli posiadamy konto lub utworzyć zupełnie nowego użytkownika. 

#### Log in
![8](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2/screenshots/8.png?raw=true)

Istniejący już użytkownicy mają możliwość zalogowania się wchodząć w podstronę "Log in". Wpisujemy tutaj nazwę użytkownika i hasło. Po udanym logowaniu na moje konto administratora (kamila), wyświetla się napis "Welcome back, kamila!!!". 

![9](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2/screenshots/9.png?raw=true)

#### Log out
Zalogowany użytkownik ma oczywiście możliwość wylogowania się ze strony wciskając opcję "Log out. Po wylogowaniu wyświetla nam się strona główna.

![10](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2/screenshots/10.png?raw=true)

#### Sign up 
![2](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2/screenshots/2.png?raw=true)

Po wejściu w "Sign up" wyświetla nam się formularz, gdzie należy wpisać nazwę nowego użytkownika i hasło. Wykorzystałam tutaj UserCreationForm. Oczywiście niemożliwe jest utworzenie użytkownika o istniejącej już nazwię, np. u mnie mam już użytkowników, mateusz, kamila i katarzyna, więc jeśli spróbuję utworzyć ponownie konto o nazwie mateusz, strona nie pozwoli mi na to. 

Lista użytkowników:

![3](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2/screenshots/3.png?raw=true)

Nieudana próba utworzenia użytkownika mateusz (kiedy już taki istnieje):

![4](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2/screenshots/4.png?raw=true)

Utwórzmy teraz użytkownika o nazwie robert:

![5](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2/screenshots/5.png?raw=true)

Po utworzeniu konta, strona przekierowuje nas do podstrony 'Log in'. Wpisujemy tu dane logowania naszego nowego użytkownika.

![6](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2/screenshots/6.png?raw=true)

Logowanie powiodło się!

![7](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2/screenshots/7.png?raw=true)

Nowo utworzony użytkownik znajduje się również na liście użytkowników widocznej dla administratora:

![19](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2/screenshots/19.png?raw=true)

#### Change Password
Po zalogowaniu użytkownik ma możliwość zmieny swojego hasła. By to zrobić należy wejść w podstronę "Change Password". 

![11](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2/screenshots/11.png?raw=true)

Wpisujemy tutaj stare hasło raz i nowe hasło dwa razy. Nowe hasło musi spełnić pewne warunki, by zmiana hasła się powiodła, inaczej wyświetlony zostanie błąd. Warunki są wypisane przed polem do wpisywania nowego hasła drugi raz. Po wpisaniu haseł i wciśnięciu opcji "Change". Pojawia się podstrona z komunikatem, że nasze hasło zostało pomyślnie zmienione. Przy następnym logowaniu musimy użyć już tego zmienionego hasła.

![12](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2/screenshots/12.png?raw=true)

#### Reset Password
W przypadku zapomnienia hasła przez użytkownika należy wcisnąć "Forgotten password?" na stronie z logowaniem. 

![13](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2/screenshots/13.png?raw=true)

Przejdziemy wtedy do podstrony umożliwiającej nam wpisanie e-maila, na którego wysłany ma zostać link do resetu hasła. W moim przypadku to gdyniakan@op.pl. 

![14](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2/screenshots/14.png?raw=true)

Po wciśnięciu "Send e-mail" przechodzimy na stronę z informacją, że mail został do nas wysłany. 

![15](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2/screenshots/15.png?raw=true)

Jako że użyty miał zostać ConsoleBackend, mail został "wysłany" do mojej konsoli. (Działa to tylko na serwerze na moim komputerze, na Heroku nic nie jest wysyłane) Wysłana wiadomość wygląda następująco:

![16](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2/screenshots/16.png?raw=true)

Mamy tutaj link, który po skopiowaniu i wklejeniu w przeglądarkę umożliwia nam wpisanie naszego nowego hasła.

![17](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2/screenshots/17.png?raw=true)

Po wpisaniu nowego hasła dwa razy (oczywiście tak samo jak w przypadku zmiany hasła, czy tworzeniu nowego użytkownika, hasło musi spełniać konkretne warunki) wyświetla nam się strona z potwierdzeniem, że nasze hasło zostało zresetowane. Można teraz zalogować się na konto za pomocą nowego hasła.

![18](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium2/screenshots/18.png?raw=true)
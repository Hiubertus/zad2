Logowanie się do DockerHub i budowanie obrazu:
![image](https://github.com/Hiubertus/zad1/assets/138579706/758e1a5d-a2be-4efa-8a4c-27c144ed9773)


Schemat projektu:
![image](https://github.com/Hiubertus/zad1/assets/138579706/2ab28bd4-0c1a-4e16-a0f4-cd2e566123b2)


Plik package.json:
![image](https://github.com/Hiubertus/zad1/assets/138579706/97642e9b-cb38-4a19-b5fc-31bbba99e2c9)


Plik server.ts
![image](https://github.com/Hiubertus/zad1/assets/138579706/66eeccf5-b052-47ca-b226-9ed51251751e)


Plik Dockerfile
![image](https://github.com/Hiubertus/zad1/assets/138579706/c4751467-20e7-497e-a5c9-069b7b7da4e5)


Uruchamianie obrazu
![image](https://github.com/Hiubertus/zad1/assets/138579706/c48d6fe5-8e12-47b0-8e93-51f85612952f)


Wygląd strony
![image](https://github.com/Hiubertus/zad1/assets/138579706/ef943c31-f0a1-442e-908d-ccbb9b639e5f)
![image](https://github.com/Hiubertus/zad1/assets/138579706/73e8c0b7-ff21-4665-b5c6-02e0d860bc62)

Ilość stworzonych warstw:
![image](https://github.com/Hiubertus/zad1/assets/138579706/079e42e7-8f11-4a4d-b86c-3b59cb251f00)

*serwer.ts:

1) zonedTime - zmienna odpowiadająca za ukazywanie godziny na podstawie strefy czasowej.
W sekcji timeZone używamy API Intl, by uzyskać timezone, a następnie z pomocą niego 
wyświetlamy na stronie daną godzinę. Wpisując w timeZone statycznie 'Australia/Sydney'
otrzymalibysmy inna godzine niż wchodząc tam z aktualnego adresu ip. 

2) app.get - służy do wyświetlania pod konkretnym adresem wiadomości

3) app.use - pojawi się w razie problemu

4) app.listen - Słucha na portcie, i wyświetla dane na konsoli, przez co możemy widziec o której został stworzony plik, przez kogo i na jakim portcie sie znajduje.

*Dockerfile

1) Najpierw używamy obrazu scratch jako buildera, dodajemy do niego obraz oraz kopiujemy pliki.

2) Następnie w Nginx, aktualizujemy wersje paczek oraz dodajemy paczki, celem tego było usunięcie wszystkich vunerbilities, co początkowo się udało i ilość ich wynosiła 0. Dokonałem tego poprzed pobranie paczek z repozytorium alpine edge, które oferuje nowsze wersje paczek niż zwykła wersja 3.19 alpine. Dzięki temu naprawiłem wszystkie problemu, do czasu. Dnia 19.05 pojawiło się nowe vunerbility busybox@1.36.1-r15. Jak widać w pliku Dockerfile, próbowałem pobrać nowszą wersję tej paczki, i rzecz w tym, że to zachodziło, nie pokazywalo mi błędów (w sytuacji próby pobrania paczki której wersja nie jest dostępna byłby widoczny taki błąd). Jednak problemem jest to, że w momencie próby downgrade'u na niższą wersje, otrzymuje błąd, że alpine pobrał wersje busybox@1.36.1-r16 (tą co potrzebuje).
![image](https://github.com/Hiubertus/zad1/assets/138579706/c82a343e-8ea1-45c5-9a59-fd8fc4922f92)


W tej wersji specialnie wpisałem złe polecenie. Jak widać, nie widzi wyższej wersji, ale poprawna wersja jest zainstalowana.Jednak w momencie zakończenia budowy gdy wszystko jest poprawnie, z jakiegoś powodu cofa się do wersji 1.36.1-r15, nie wiem czemu. Dlatego jest to jedno vunerbility.
![image](https://github.com/Hiubertus/zad1/assets/138579706/e68e4037-af90-40d8-b4cf-47a94c2b6a9e)

3) Następnie tworzymy folder app i przekopiowywujemy do niego zawartość obrazu builder, a także dodajemy konfiguracje Nginx

4) Rezerwujemy port, po czym następnie ustawiamy healthcheck

5) Potem każemy pobrać i zaktualizowac wszystkie paczki npm

6) Uruchamiamy serwer

















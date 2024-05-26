import express, { Request, Response } from 'express';
import { DateTime } from 'luxon';

const app = express();
const PORT = 4000;

const zonedTime = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, //'Australia/Sydney'
  }).format(new Date(DateTime.utc().toISO()))

app.get('/', (req: Request, res: Response) => {
    const clientIP = req.ip;
    res.send(`
    <html>
    <body>
        <p>Adres IP klienta: ${clientIP}</p>
        <p>Data wejścia na stronę (Twoja strefa czasowa): <span id="localTime">${zonedTime}</span></p>
        <script>
            const localTime = document.getElementById('localTime').textContent;
            document.getElementById('localTime').textContent = localTime;
        </script>
    </body>
    </html>
    `);
});

app.use((err: any, req: Request, res: Response, next: any) => {
    console.error(err.stack);
    res.status(500).send('Wystąpił błąd!');
});

app.listen(PORT, () => {
    console.log(`Serwer uruchomiony przez: Hubert Ozarowski`);
    console.log(`Data uruchomienia serwera: ${new Date(DateTime.utc().toISO()).toLocaleString()}`);
    console.log(`Nasłuchiwanie na porcie ${PORT}`);
});

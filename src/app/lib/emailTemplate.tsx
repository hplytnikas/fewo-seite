import * as React from 'react';

interface EmailTemplateProps {
  email: string;
  lastname: string;
  message: string;
  name: string;
  people: number;
  petList: string;
  pets: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  lastname,
  message,
  name,
  people,
  petList,
  pets,
}) => (
  <div>
    <h1>Neue Anfrage</h1>
    <p>Name: {name}</p>
    <p>Nachname: {lastname}</p>
    <p>Email: {email}</p>
    <p>Anzahl Gäste: {people}</p>
    <p>Haustiere: {pets}</p>
    <p>Liste der Haustiere: {petList}</p>
    <p>Nachricht: {message}</p>
  </div>
);

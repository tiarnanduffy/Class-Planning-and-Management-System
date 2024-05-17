import { Inter } from 'next/font/google';
import { Lusitana } from 'next/font/google';
 
// Sets up the different fonts used in the application
export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({ subsets: ['latin'], weight: ['400'] });

export const bahnschrift = {
    fontFamily: 'Bahnschrift',
    fontPath: './BAHNSCHRIFT.TTF',
    subsets: ['latin'],
    weight: ['400'],
  };
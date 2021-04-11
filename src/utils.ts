import * as crypto from 'crypto';
import * as fire from './Database/firebase';

//Retorna um objeto contendo o codigo do usuario e o hash code
//que sera utilizado para armazenar no banco
//caso ela receba uma string como parametro vamos retornar o seu hash code para averiguar se ja existe
export function hashCode(randomCode = '') {
    const hash = crypto.createHash('sha256');
    
    const alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    // let randomCode = '';
    
    let response = '';

    if(!randomCode) {
        for(let i = 0; i < 8; i++) {
            randomCode += alfabeto[getRandomInt(0, alfabeto.length-1)].toUpperCase();
        }
    }

    hash.on('readable', () => {
        const data = hash.read();
        if(data) {
            response = data.toString('hex')
        }
    })

    hash.write(randomCode);
    hash.end();
    
    return {
        code: randomCode,
        hash: response
    };
}

export async function checkForToken(token: string) {
    let foundToken = false;
    await fire.DataService.collection('tokens').get()
            .then((docs) => {
                docs.forEach((document) => {
                    const data = document.data();
                    
                    const hash = hashCode(token);

                    if(hash.hash === data.hash) {
                        foundToken = true;
                    }
                })
            })

    return foundToken;
}

//Retorna um numero inteiro aleatorio entre min e max
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
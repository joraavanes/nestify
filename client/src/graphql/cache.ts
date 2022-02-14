import { InMemoryCache, ReactiveVar, makeVar } from '@apollo/client';
import { authState } from '../types';

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                auth: {
                    read(){
                        return authVar();
                    }
                }
            }
        }
    }
});

export const authVar: ReactiveVar<authState> = makeVar<authState>({});

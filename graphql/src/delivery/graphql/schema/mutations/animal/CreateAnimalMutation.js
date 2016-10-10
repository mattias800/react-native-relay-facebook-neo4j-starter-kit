import {mutationWithClientMutationId} from "graphql-relay";
import {GraphQLNonNull, GraphQLString, GraphQLBoolean} from "graphql";
import {AnimalType} from "../../types/AnimalType";
import {Animal} from "../../../../../entities/Animal";
import {insertAnimal} from "../../../../../persistence/service/AnimalService";
import {UserType} from "../../types/UserType";
import {validateToken} from "../../../../../services/Authenticator";

export const createAnimalMutation = mutationWithClientMutationId(
    {
        name: 'CreateAnimal',
        inputFields: {
            token: {type: new GraphQLNonNull(GraphQLString)},
            fullName: {type: new GraphQLNonNull(GraphQLString)},
            nickName: {type: new GraphQLNonNull(GraphQLString)},
            animalKind: {type: new GraphQLNonNull(GraphQLString)},
            birthDate: {type: GraphQLString},
            deathDate: {type: GraphQLString},
            deceased: {type: new GraphQLNonNull(GraphQLBoolean)}
        },
        outputFields: {
            animal: {type: AnimalType},
            user: {type: UserType}
        },
        mutateAndGetPayload: async({
            token,
            fullName,
            nickName,
            animalKind,
            birthDate,
            deathDate,
            deceased
        }) => {
            const user = await validateToken(token);
            const animal = Animal.createNewAnimal(fullName,
                                                  nickName,
                                                  animalKind,
                                                  birthDate,
                                                  deathDate,
                                                  deceased);
            await insertAnimal(animal, user);

            return {
                animal,
                user
            };
        }
    });

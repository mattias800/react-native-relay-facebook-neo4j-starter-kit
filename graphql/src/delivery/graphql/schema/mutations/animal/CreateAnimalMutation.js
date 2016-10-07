import {mutationWithClientMutationId} from "graphql-relay";
import {GraphQLNonNull, GraphQLString, GraphQLBoolean} from "graphql";
import {AnimalType} from "../../types/AnimalType";
import {Animal} from "../../../../../entities/Animal";
import * as UserService from "../../../../../persistence/service/UserService";
import {insertAnimal} from "../../../../../persistence/service/AnimalService";
import {UserType} from "../../types/UserType";

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
            const user = await UserService.getUserByAuthToken(token);
            if (!user) {
                throw "Invalid token.";
            }

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

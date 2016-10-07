export function transformFormModelToPayload(model) {
    console.log("TRANSFORM");
    console.log(model);

    return {
        fullName: model.fullName,
        nickName: model.nickName,
        animalKind: "dog",
        deceased: Boolean(model.deceased),
        ...(model.wantToEnterDates ? {
            birthDate: model.birthDate,
            deceased: Boolean(model.deceased),
            ...(model.deceased && !model.forgotDeathDate ? {
                deathDate: model.deathDate
            } : {})
        } : {})
    }
}
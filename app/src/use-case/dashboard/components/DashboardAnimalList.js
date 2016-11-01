/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, Image, View} from "react-native";
import {SectionHeader} from "../../../common/ui/SectionHeader";
import {Row} from "../../../common/ui/Row";
import {timeSince} from "../../../common/util/DateFormatter";
import {AddAnimalButton} from "../../animals/add-animal/components/AddAnimalButton";
import {SmallAddButton} from "./SmallAddButton";
import {selectMedia} from "../../../common/ui/photo/MediaSelector";

class DashboardAnimalListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {user, navigator} = this.props;

        return (
            <View>
                <SectionHeader label="Dogs" />
                {
                    user && user.animals && user.animals.edges && user.animals.edges.length
                        ?
                        user.animals
                            .edges
                            .map(edge => edge.node)
                            .map(animal => (
                                <View style={animalListItemContainer}
                                      key={animal.id}>
                                    <Text style={animalListNameStyle}>{animal.fullName}</Text>
                                    <Text style={timeSinceLastPhotoStyle}>{getPhotosText(animal)}</Text>
                                    <Row style={{marginTop:10}}>
                                        <SmallAddButton style={photoRowPhotoStyle}
                                                        onPress={(() => this.addPhoto(animal))} />
                                        {
                                            animal.taggedPhotos
                                            && animal.taggedPhotos.edges
                                            && animal.taggedPhotos
                                            && animal.taggedPhotos.edges.length
                                                ?
                                                animal.taggedPhotos
                                                      .edges
                                                      .map(edge => edge.node)
                                                      .map(photo => (
                                                          <Image key={photo.id}
                                                                 style={photoRowPhotoStyle}
                                                                 source={{uri:photo.url}} />
                                                      ))
                                                :
                                                <View></View>
                                        }
                                    </Row>
                                </View>
                            ))
                        :
                        <View>
                            <Text>No animals added yet.</Text>
                            <AddAnimalButton navigator={navigator} />
                        </View>
                }
            </View>
        );
    }

    async addPhoto(animal) {
        const {navigator} = this.props;
        let source;
        try {
            source = await selectMedia();

            navigator.push(
                {
                    screen: 'example.PostMediaPageScreen',
                    title: `Upload media`,
                    passProps: {
                        source
                    }
                });
        } catch (e) {
            console.log("Naaaaah");
            console.log(e);
        }
    }

}

export const DashboardAnimalList = Relay.createContainer(DashboardAnimalListComponent, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                animals(first:10) {
                    edges {
                        node {
                            id
                            fullName
                            nickName
                            taggedPhotos(first:10) {
                                edges {
                                    node {
                                        id
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
    `,
    },
});

function getPhotosText(animal) {
    if (animal.taggedPhotos && animal.taggedPhotos.edges && animal.taggedPhotos.edges.length) {
        const photo = animal.taggedPhotos.edges[0].node;
        return `Last photo ${timeSince(photo.createdAt)}`;
    } else {
        return `No photos of ${animal.nickName} yet.`;
    }
}
const animalListItemContainer = {
    padding: 10
};

const animalListNameStyle = {
    fontSize: 16
};

const timeSinceLastPhotoStyle = {
    fontSize: 12
};

const photoRowPhotoStyle = {
    width: 50,
    height: 50,
    marginRight: 5
};

const noPhotosYetStyle = {
    fontSize: 12
};
/* @flow */
import React from "react";
import Relay from "react-relay";
import {AppRegistry, StyleSheet, Text, Image, View} from "react-native";
import {SectionHeader} from "../../../common/ui/SectionHeader";
import {Row} from "../../../common/ui/Row";

class DashboardAnimalListComponent extends React.Component {

    render() {
        const {user} = this.props;

        return (
            <View>
                <SectionHeader label="Dogs" />
                {
                    user && user.animals && user.animals.edges && user.animals.edges.length
                        ?
                        user.animals.edges.map(edge => edge.node).map(animal => (
                            <View style={animalListItemContainer}
                                  key={animal.id}>
                                <Text style={animalListNameStyle}>{animal.fullName}</Text>
                                <Row>
                                    {
                                        animal.taggedPhotos
                                        && animal.taggedPhotos.edges
                                        && animal.taggedPhotos
                                        && animal.taggedPhotos.edges.length
                                            ?
                                            animal.taggedPhotos.edges.map(edge => edge.node).map(photo => (
                                                <Image style={photoRowPhotoStyle}
                                                       source={{uri:photo.url}} />
                                            ))
                                            :
                                            <Text style={noPhotosYetStyle}>No photos of {animal.nickName} yet.</Text>
                                    }
                                </Row>
                            </View>
                        ))
                        :
                        <View>
                            <Text>No animals added yet.</Text>
                        </View>
                }
            </View>
        );
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

const animalListItemContainer = {
    padding: 10
};

const animalListNameStyle = {
    fontSize: 16
};

const photoRowPhotoStyle = {
    width: 50,
    height: 50
};

const noPhotosYetStyle = {
    fontSize: 12
};
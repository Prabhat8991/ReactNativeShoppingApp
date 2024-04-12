import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Star from './Star';
import { Colors } from '../../colors/colors';

const Rating = ({ rating }) => {
    const clampedRating = Math.min(Math.max(rating, 0), 5);

    const filledStars = Math.floor(clampedRating);

    const lastStarFillPercentage = ((clampedRating - filledStars) / 1) * 100;

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
        stars.push(<Star key={i} fillPercentage={100} />);
    }

    if (lastStarFillPercentage > 0 && filledStars < 5) {
        stars.push(<Star key={filledStars} fillPercentage={lastStarFillPercentage} />);
    }

    for (let i = stars.length; i < 5; i++) {
        stars.push(<Star key={i} fillPercentage={0} />);
    }

    return (
        <View style={styles.container}>
            {stars}
            <Text style={styles.ratingText}>({rating})</Text>
        </View>
    );
};

export default Rating;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ratingText: {
        fontSize: 15,
        color: 'gray'
    }
})

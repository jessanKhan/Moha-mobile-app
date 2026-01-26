import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Header from '../../components/Header';
import { ScaledSheet } from 'react-native-size-matters';

const QuickLinkScreen = () => {
    return (
        <View style={styles.container}>
            <Header title="দ্রুত লিংক" showBackButton={true} />
            <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.contentBanner}>
                    <Text style={styles.title}>দ্রুত লিংক</Text>
                    <Text style={styles.description}>This screen will contain quick links.</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContent: {
        flex: 1,
        padding: '16@ms',
    },
    contentBanner: {
        backgroundColor: '#F9FAFB',
        padding: '24@ms',
        borderRadius: '16@ms',
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    title: {
        fontSize: '20@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '16@vs',
    },
    description: {
        color: '#4B5563',
        fontSize: '14@ms',
        lineHeight: '24@ms',
    },
});

export default QuickLinkScreen;

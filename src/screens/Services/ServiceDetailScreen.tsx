import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Header from '../../components/Header';
import { ScaledSheet } from 'react-native-size-matters';
import AppBackground from '../../components/AppBackground';

type ServiceDetailRouteParams = {
    ServiceDetails: {
        id: string;
        title: string;
    };
};

const ServiceDetailScreen = () => {
    const route = useRoute<RouteProp<ServiceDetailRouteParams, 'ServiceDetails'>>();
    const { title } = route.params;

    return (
        <AppBackground>
            <Header
                title={title}
                showBackButton={true}
            />
            <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.contentBanner}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <Text style={styles.description}>
                        Details for {title} will be available here soon. This is a placeholder screen for the service details.
                    </Text>
                </View>
            </ScrollView>
        </AppBackground>
    );
};

const styles = ScaledSheet.create({
    scrollContent: {
        flex: 1,
        padding: '16@ms',
    },
    contentBanner: {
        backgroundColor: 'rgba(249, 250, 251, 0.8)',
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
        fontFamily: 'July-Bold',
    },
    description: {
        color: '#4B5563',
        fontSize: '14@ms',
        lineHeight: '24@ms',
        fontFamily: 'July-Regular',
    },
});

export default ServiceDetailScreen;

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Header from '../../components/Header';
import { LucideIcon } from 'lucide-react-native';

type ServiceDetailRouteParams = {
    ServiceDetails: {
        id: string;
        title: string;
        // We can't pass the icon component directly easily in params usually without warnings, 
        // but for internal app use it often works or we can pass the name. 
        // For now we will just use the title.
    };
};

const ServiceDetailScreen = () => {
    const route = useRoute<RouteProp<ServiceDetailRouteParams, 'ServiceDetails'>>();
    const { title } = route.params;

    return (
        <View className="flex-1 bg-white dark:bg-black">
            <Header
                title={title}
                showBackButton={true}
            />
            <ScrollView className="flex-1 p-4">
                <View className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
                    <Text className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        {title}
                    </Text>
                    <Text className="text-gray-600 dark:text-gray-300 leading-6">
                        Details for {title} will be available here soon. This is a placeholder screen for the service details.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default ServiceDetailScreen;

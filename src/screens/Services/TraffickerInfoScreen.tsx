import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import Step1BasicInfo from '../../components/TraffickerInfo/Step1BasicInfo';
import Step2Details from '../../components/TraffickerInfo/Step2Details';
import Step3Location from '../../components/TraffickerInfo/Step3Location';
import Step4Evidence from '../../components/TraffickerInfo/Step4Evidence';
import Step5Identity from '../../components/TraffickerInfo/Step5Identity';
import Step6Review from '../../components/TraffickerInfo/Step6Review';

const TraffickerInfoScreen = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 6;

    const [formData, setFormData] = useState({
        // Step 1
        name: 'হাসান আহমেদ',
        nickname: 'হাসান',
        age: '৪৫',
        gender: 'পুরুষ',
        // Step 2
        mobile: '',
        socialLink: '',
        lastSeen: '',
        activities: ['কাজের প্রলোভন'],
        // Step 3
        eventPlace: 'ঢাকা, বাংলাদেশ',
        selectPlace: '',
        address: '',
        description: 'তথ্য দিতে শুরু করুন',
        // Step 4
        hasEvidence: false,
        // Step 5
        identityPreference: 'anonymous'
    });

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            console.log('Submitting data:', formData);
        }
    };

    const renderProgressBar = () => {
        const percentage = Math.round((currentStep / totalSteps) * 100);
        return (
            <View className="bg-white dark:bg-zinc-900 mx-4 mt-6 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-gray-600 dark:text-gray-400 font-bold text-sm">ধাপ {currentStep} / {totalSteps}</Text>
                    <Text className="text-[#2563EB] font-bold text-sm">{percentage}%</Text>
                </View>
                <View className="h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <View
                        className="h-full bg-[#00897B]"
                        style={{ width: `${percentage}%` }}
                    />
                </View>
            </View>
        );
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1: return <Step1BasicInfo formData={formData} setFormData={setFormData} />;
            case 2: return <Step2Details formData={formData} setFormData={setFormData} />;
            case 3: return <Step3Location formData={formData} setFormData={setFormData} />;
            case 4: return <Step4Evidence />;
            case 5: return <Step5Identity formData={formData} setFormData={setFormData} />;
            case 6: return <Step6Review formData={formData} />;
            default: return <Step1BasicInfo formData={formData} setFormData={setFormData} />;
        }
    };

    return (
        <View className="flex-1 bg-[#F8F9FA] dark:bg-black">
            <Header title="পাচারকারী সম্পর্কে তথ্য" subtitle='নিরাপদভাবে ও সহজভাবে পাচারকারী সম্পর্কে তথ্য প্রদান' showBackButton={true} />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {renderProgressBar()}
                {renderStepContent()}
                <View className="h-32" />
            </ScrollView>

            {/* Sticky Bottom Button */}
            <View className="absolute bottom-6 left-0 right-0 px-6">
                <TouchableOpacity
                    onPress={nextStep}
                    className="bg-[#1E3A8A] rounded-2xl py-4 items-center justify-center shadow-lg shadow-blue-900/40"
                >
                    <Text className="text-white font-bold text-lg">
                        {currentStep === totalSteps ? 'জমা দিন' : 'পরবর্তী ধাপ'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TraffickerInfoScreen;

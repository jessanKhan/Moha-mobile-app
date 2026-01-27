import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import Step1BasicInfo from '../../components/TraffickerInfo/Step1BasicInfo';
import Step2Details from '../../components/TraffickerInfo/Step2Details';
import Step3Location from '../../components/TraffickerInfo/Step3Location';
import Step4Evidence from '../../components/TraffickerInfo/Step4Evidence';
import Step5Identity from '../../components/TraffickerInfo/Step5Identity';
import Step6Review from '../../components/TraffickerInfo/Step6Review';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

const TraffickerInfoScreen = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 6;

    const [formData, setFormData] = useState({
        name: 'হাসান আহমেদ',
        nickname: 'হাসান',
        age: '৪৫',
        gender: 'পুরুষ',
        mobile: '',
        socialLink: '',
        lastSeen: '',
        activities: ['কাজের প্রলোভন'],
        eventPlace: 'ঢাকা, বাংলাদেশ',
        selectPlace: '',
        address: '',
        description: 'তথ্য দিতে শুরু করুন',
        hasEvidence: false,
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
            <View style={styles.progressContainer}>
                <View style={styles.progressInfo}>
                    <Text style={styles.stepText}>ধাপ {currentStep} / {totalSteps}</Text>
                    <Text style={styles.percentageText}>{percentage}%</Text>
                </View>
                <View style={styles.progressBarBackground}>
                    <View
                        style={[styles.progressBarFill, { width: `${percentage}%` }]}
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
        <View style={styles.container}>
            <Header title="পাচারকারী সম্পর্কে তথ্য" subtitle='নিরাপদভাবে ও সহজভাবে পাচারকারী সম্পর্কে তথ্য প্রদান' showBackButton={true} />

            <ScrollView style={styles.flex1} showsVerticalScrollIndicator={false}>
                {renderProgressBar()}
                {renderStepContent()}
                <View style={styles.spacer} />
            </ScrollView>

            {/* Sticky Bottom Button */}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity
                    onPress={nextStep}
                    activeOpacity={0.8}
                    style={styles.submitButton}
                >
                    <Text style={styles.submitButtonText}>
                        {currentStep === totalSteps ? 'জমা দিন' : 'পরবর্তী ধাপ'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    flex1: {
        flex: 1,
    },
    progressContainer: {
        backgroundColor: 'white',
        marginHorizontal: '16@ms',
        marginTop: '24@vs',
        padding: '16@ms',
        borderRadius: '16@ms',
        borderWidth: 1,
        borderColor: '#F3F4FB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    progressInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12@vs',
    },
    stepText: {
        color: '#4B5563',
        fontWeight: 'bold',
        fontSize: '14@ms',
    },
    percentageText: {
        color: '#2563EB',
        fontWeight: 'bold',
        fontSize: '14@ms',
    },
    progressBarBackground: {
        height: '8@vs',
        backgroundColor: '#F3F4FB',
        borderRadius: '4@vs',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#00897B',
    },
    spacer: {
        height: '130@vs',
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: '24@vs',
        left: 0,
        right: 0,
        paddingHorizontal: '24@ms',
    },
    submitButton: {
        backgroundColor: '#1E3A8A',
        height: '56@vs',
        borderRadius: '16@ms',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#1E3A8A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18@ms',
    },
});

export default TraffickerInfoScreen;

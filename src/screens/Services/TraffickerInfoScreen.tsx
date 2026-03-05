import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { showToast } from '../../store/slices/toastSlice';
import Header from '../../components/Header';
import Step1BasicInfo from '../../components/TraffickerInfo/Step1BasicInfo';
import Step2Details from '../../components/TraffickerInfo/Step2Details';
import Step3Location from '../../components/TraffickerInfo/Step3Location';
import Step4Evidence from '../../components/TraffickerInfo/Step4Evidence';
import Step5Identity from '../../components/TraffickerInfo/Step5Identity';
import Step6Review from '../../components/TraffickerInfo/Step6Review';
import { ScaledSheet } from 'react-native-size-matters';
import AppBackground from '../../components/AppBackground';
import { launchImageLibrary } from 'react-native-image-picker';
import { GRAPHQL_URI } from '../../api/apolloClient';

const TraffickerInfoScreen = () => {
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const languageMode = useSelector((state: RootState) => state.language.mode);
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 6;

    const [formData, setFormData] = useState({
        name: '',
        nickname: '',
        age: '',
        gender: 'পুরুষ',
        mobile: '',
        socialLink: '',
        lastSeen: '',
        activities: [] as string[],
        eventPlace: '',
        selectPlace: '',
        address: '',
        description: '',
        hasEvidence: false,
        identityPreference: 'anonymous',
        evidenceFiles: [] as any[],
        photo: null as any
    });
    console.log(formData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [createCriminal, { loading }] = useMutation(CREATE_CRIMINAL); // Replaced with manual fetch for multipart

    const handlePhotoPick = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
        });

        if (result.assets && result.assets.length > 0) {
            setFormData(prev => ({
                ...prev,
                photo: result.assets![0]
            }));
        }
    };

    const handleFilePick = async () => {
        const result = await launchImageLibrary({
            mediaType: 'mixed',
            selectionLimit: 5,
        });

        if (result.assets) {
            setFormData(prev => ({
                ...prev,
                evidenceFiles: [...prev.evidenceFiles, ...result.assets!]
            }));
        }
    };

    const nextStep = async () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsSubmitting(true);
            try {
                const url = GRAPHQL_URI;
                const formDataUpload = new FormData();

                const operations = {
                    query: `mutation CreateCriminal(
                        $name: String,
                        $nickname: String,
                        $age: String,
                        $gender: String,
                        $phone: String,
                        $socialMedia: String,
                        $location: String,
                        $activity: [String!],
                        $activityArea: String,
                        $activityPlace: String,
                        $activityAddress: String,
                        $activityTime: String,
                        $activityDescription: String,
                        $revealIdentity: YesOrNo!,
                        $photoUrl: Upload,
                        $documents: [CreateCriminalDocumentInput!]
                    ) {
                        createCriminal(
                        createCriminalInput: {
                            name: $name,
                            nickname: $nickname,
                            age: $age,
                            gender: $gender,
                            phone: $phone,
                            socialMedia: $socialMedia,
                            location: $location,
                            activity: $activity,
                            activityArea: $activityArea,
                            activityPlace: $activityPlace,
                            activityAddress: $activityAddress,
                            activityTime: $activityTime,
                            activityDescription: $activityDescription,
                            revealIdentity: $revealIdentity,
                            photoUrl: $photoUrl,
                            documents: $documents
                        }
                        ) {
                        id
                        name
                        nickname
                        }
                    }`,
                    variables: {
                        name: formData.name,
                        nickname: formData.nickname,
                        age: formData.age,
                        gender: formData.gender === 'পুরুষ' ? 'MALE' : formData.gender === 'মহিলা' ? 'FEMALE' : 'OTHER',
                        phone: formData.mobile,
                        socialMedia: formData.socialLink,
                        location: formData.eventPlace,
                        activity: formData.activities,
                        activityArea: formData.eventPlace,
                        activityPlace: formData.selectPlace,
                        activityAddress: formData.address,
                        activityTime: new Date().toISOString(),
                        activityDescription: formData.description,
                        revealIdentity: formData.identityPreference === 'contact' ? 'YES' : 'NO',
                        photoUrl: null,
                        documents: formData.evidenceFiles.map((file, index) => ({
                            fileName: file.fileName || `file_${index}.jpg`,
                            description: '',
                            fileUrl: null
                        }))
                    }
                };

                formDataUpload.append('operations', JSON.stringify(operations));

                const map: any = {};
                let fileIndex = 0;

                if (formData.photo) {
                    map[fileIndex] = ["variables.photoUrl"];
                    fileIndex++;
                }

                formData.evidenceFiles.forEach((_, index) => {
                    map[fileIndex] = [`variables.documents.${index}.fileUrl`];
                    fileIndex++;
                });

                formDataUpload.append('map', JSON.stringify(map));

                fileIndex = 0;
                if (formData.photo) {
                    formDataUpload.append(fileIndex.toString(), {
                        uri: formData.photo.uri,
                        type: formData.photo.type || 'image/jpeg',
                        name: formData.photo.fileName || 'trafficker_photo.jpg',
                    } as any);
                    fileIndex++;
                }

                formData.evidenceFiles.forEach((file, index) => {
                    formDataUpload.append(fileIndex.toString(), {
                        uri: file.uri,
                        type: file.type || 'image/jpeg',
                        name: file.fileName || `file_${index}.jpg`,
                    } as any);
                    fileIndex++;
                });

                const response = await fetch(url, {
                    method: 'POST',
                    body: formDataUpload,
                    headers: {
                        'Apollo-Require-Preflight': 'true',
                    },
                });

                const result = await response.json();
                console.log('Submission Result:', result);

                if (result.data?.createCriminal) {
                    dispatch(showToast({
                        message: languageMode === 'en' ? 'Submitted successfully!' : 'সফলভাবে জমা দেওয়া হয়েছে!',
                        type: 'success'
                    }));

                    setFormData({
                        name: '',
                        nickname: '',
                        age: '',
                        gender: 'পুরুষ',
                        mobile: '',
                        socialLink: '',
                        lastSeen: '',
                        activities: [] as string[],
                        eventPlace: '',
                        selectPlace: '',
                        address: '',
                        description: '',
                        hasEvidence: false,
                        identityPreference: 'anonymous',
                        evidenceFiles: [] as any[],
                        photo: null as any
                    });
                    setCurrentStep(1);
                    navigation.navigate('HomeScreen');
                } else {
                    throw new Error(result.errors?.[0]?.message || 'GraphQL Error');
                }
            } catch (error) {
                console.error('Submission error:', error);
                Alert.alert(
                    languageMode === 'en' ? "Error" : "ত্রুটি",
                    languageMode === 'en' ? "Could not submit information. Please try again." : "তথ্য জমা দেওয়া সম্ভব হয়নি। আবার চেষ্টা করুন।"
                );
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const renderProgressBar = () => {
        const percentage = Math.round((currentStep / totalSteps) * 100);
        return (
            <View style={styles.progressContainer}>
                <View style={styles.progressInfo}>
                    <Text style={styles.stepText}>
                        {languageMode === 'en' ? `Step ${currentStep} / ${totalSteps}` : `ধাপ ${currentStep} / ${totalSteps}`}
                    </Text>
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
            case 1: return <Step1BasicInfo formData={formData} setFormData={setFormData} onPickPhoto={handlePhotoPick} />;
            case 2: return <Step2Details formData={formData} setFormData={setFormData} />;
            case 3: return <Step3Location formData={formData} setFormData={setFormData} />;
            case 4: return <Step4Evidence formData={formData} onPickFile={handleFilePick} setFormData={setFormData} />;
            case 5: return <Step5Identity formData={formData} setFormData={setFormData} />;
            case 6: return <Step6Review formData={formData} />;
            default: return <Step1BasicInfo formData={formData} setFormData={setFormData} onPickPhoto={handlePhotoPick} />;
        }
    };

    return (
        <AppBackground>
            <Header
                title={languageMode === 'en' ? "Trafficker Information" : "পাচারকারী সম্পর্কে তথ্য"}
                subtitle={languageMode === 'en' ? "Provide information about traffickers safely and easily" : 'নিরাপদভাবে ও সহজভাবে পাচারকারী সম্পর্কে তথ্য প্রদান'}
                showBackButton={true}
            />

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
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.submitButtonText}>
                            {currentStep === totalSteps
                                ? (languageMode === 'en' ? 'Submit' : 'জমা দিন')
                                : (languageMode === 'en' ? 'Next Step' : 'পরবর্তী ধাপ')}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </AppBackground>
    );
};

const styles = ScaledSheet.create({
    flex1: {
        flex: 1,
    },
    progressContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        marginHorizontal: '16@ms',
        marginTop: '24@vs',
        padding: '16@ms',
        borderRadius: '16@ms',
        borderWidth: 1,
        borderColor: '#F3F4FB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
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
        fontFamily: 'July-Bold',
    },
    percentageText: {
        color: '#2563EB',
        fontWeight: 'bold',
        fontSize: '14@ms',
        fontFamily: 'July-Bold',
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
        fontFamily: 'July-Bold',
    },
});

export default TraffickerInfoScreen;

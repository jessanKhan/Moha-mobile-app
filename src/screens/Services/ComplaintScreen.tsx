import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import Header from '../../components/Header';
import { Lock, Upload, Send, X } from 'lucide-react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import HotlineBanner from '../../components/HotlineBanner';
import AppBackground from '../../components/AppBackground';
import { launchImageLibrary } from 'react-native-image-picker';
import { GRAPHQL_URI } from '../../api/apolloClient';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ComplaintScreen = () => {
    const languageMode = useSelector((state: RootState) => state.language.mode);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: '',
        description: '',
    });

    const [attachment, setAttachment] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFilePick = async () => {
        const result = await launchImageLibrary({
            mediaType: 'mixed',
            selectionLimit: 1,
        });

        if (result.assets && result.assets.length > 0) {
            setAttachment(result.assets[0]);
        }
    };

    const removeAttachment = () => {
        setAttachment(null);
    };

    const handleSubmit = async () => {
        if (!formData.description) {
            Alert.alert(
                languageMode === 'en' ? "Warning" : "সতর্কতা",
                languageMode === 'en' ? "Please enter the incident description." : "অনুগ্রহ করে ঘটনার বিবরণ লিখুন।"
            );
            return;
        }

        setIsSubmitting(true);

        try {
            const url = GRAPHQL_URI;
            const formDataUpload = new FormData();

            const operations = {
                query: `mutation CreateComplain($createComplainInput: CreateComplainInput!) {
                    createComplain(createComplainInput: $createComplainInput) {
                        id
                    }
                }`,
                variables: {
                    createComplainInput: {
                        name: formData.name || 'Anonymous Reporter',
                        phone: formData.phone,
                        incidentAddress: formData.location,
                        description: formData.description,
                        // Providing default/empty values for other required fields
                        isMinor: "NO",
                        gender: "OTHER",
                        suspectInfo: {
                            name: 'Unknown Suspect'
                        },
                        attachmentUrl: null // mapped to file
                    }
                }
            };

            formDataUpload.append('operations', JSON.stringify(operations));

            const map: any = {};
            if (attachment) {
                map['0'] = ["variables.createComplainInput.attachmentUrl"];
            }
            formDataUpload.append('map', JSON.stringify(map));

            if (attachment) {
                formDataUpload.append('0', {
                    uri: attachment.uri,
                    type: attachment.type || 'image/jpeg',
                    name: attachment.fileName || 'attachment.jpg',
                } as any);
            }

            const response = await fetch(url, {
                method: 'POST',
                body: formDataUpload,
                headers: {
                    'Apollo-Require-Preflight': 'true',
                },
            });

            const result = await response.json();

            if (result.data?.createComplain) {
                Alert.alert(
                    languageMode === 'en' ? "Success" : "সফল",
                    languageMode === 'en' ? "Your complaint has been submitted successfully." : "আপনার অভিযোগ সফলভাবে জমা দেওয়া হয়েছে।",
                    [{
                        text: languageMode === 'en' ? "OK" : "ঠিক আছে",
                        onPress: () => {
                            setFormData({
                                name: '',
                                phone: '',
                                location: '',
                                description: '',
                            });
                            setAttachment(null);
                        }
                    }]
                );
            } else {
                throw new Error(result.errors?.[0]?.message || 'GraphQL Error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            Alert.alert(
                languageMode === 'en' ? "Error" : "ত্রুটি",
                languageMode === 'en' ? "Could not submit complaint. Please try again." : "অভিযোগ জমা দেওয়া সম্ভব হয়নি। আবার চেষ্টা করুন।"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AppBackground>
            <Header 
                title={languageMode === 'en' ? "Complaint" : "অভিযোগ করুন"} 
                subtitle={languageMode === 'en' ? "Your information will be completely secure" : 'আপনার তথ্য সম্পূর্ণ সুরক্ষিত থাকবে'} 
                showBackButton={true} 
            />
            <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Privacy Warning Banner */}
                <View style={styles.privacyBanner}>
                    <View style={styles.privacyIconWrapper}>
                        <Lock size={moderateScale(20)} color="white" />
                    </View>
                    <View style={styles.privacyTextWrapper}>
                        <Text style={styles.privacyTitle}>
                            {languageMode === 'en' ? "Privacy Assured" : "গোপনীয়তা নিশ্চিত করা হবে"}
                        </Text>
                        <Text style={styles.privacyDescription}>
                            {languageMode === 'en' ? "Your identity and all information will be kept completely confidential. Your security is our first priority." : "আপনার পরিচয় এবং সকল তথ্য সম্পূর্ণ গোপন রাখা হবে। আপনার নিরাপত্তা আমাদের প্রথম অগ্রাধিকার।"}
                        </Text>
                    </View>
                </View>

                {/* Name Input */}
                <View style={styles.inputCard}>
                    <View style={styles.inputHeader}>
                        <Text style={styles.inputLabel}>
                            {languageMode === 'en' ? "Complainant's Name" : "অভিযোগকারীর নাম"}
                        </Text>
                        <Text style={styles.optionalLabel}>
                            {languageMode === 'en' ? "(Optional)" : "(ঐচ্ছিক)"}
                        </Text>
                    </View>
                    <TextInput
                        placeholder={languageMode === 'en' ? "Enter your name" : "আপনার নাম লিখুন"}
                        style={styles.textInput}
                        placeholderTextColor="#9CA3AF"
                        value={formData.name}
                        onChangeText={(val) => setFormData({ ...formData, name: val })}
                    />
                    <Text style={styles.inputFooterText}>
                        {languageMode === 'en' ? "Complaint will be accepted even without a name" : "নাম না দিলেও অভিযোগ গ্রহণ করা হবে"}
                    </Text>
                </View>

                {/* Mobile Input */}
                <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>
                        {languageMode === 'en' ? "Mobile Number" : "মোবাইল নম্বর"}
                    </Text>
                    <TextInput
                        placeholder={languageMode === 'en' ? "01XXXXXXXXX" : "০১৭XXXXXXXX"}
                        keyboardType="phone-pad"
                        style={styles.textInput}
                        placeholderTextColor="#9CA3AF"
                        value={formData.phone}
                        onChangeText={(val) => setFormData({ ...formData, phone: val })}
                    />
                </View>

                {/* Location Input */}
                <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>
                        {languageMode === 'en' ? "Place of Incident" : "ঘটনার স্থান"}
                    </Text>
                    <TextInput
                        placeholder={languageMode === 'en' ? "Area, Thana, District" : "এলাকা, থানা, জেলা"}
                        style={styles.textInput}
                        placeholderTextColor="#9CA3AF"
                        value={formData.location}
                        onChangeText={(val) => setFormData({ ...formData, location: val })}
                    />
                </View>

                {/* Description Input */}
                <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>
                        {languageMode === 'en' ? "Incident Description" : "ঘটনার বিবরণ"}
                    </Text>
                    <TextInput
                        placeholder={languageMode === 'en' ? "Write details about the incident..." : "ঘটনা সম্পর্কে বিস্তারিত লিখুন..."}
                        multiline
                        textAlignVertical="top"
                        numberOfLines={4}
                        style={[styles.textInput, styles.textArea]}
                        placeholderTextColor="#9CA3AF"
                        value={formData.description}
                        onChangeText={(val) => setFormData({ ...formData, description: val })}
                    />
                </View>

                {/* File Upload */}
                <View style={styles.inputCard}>
                    <View style={styles.inputHeader}>
                        <Text style={styles.inputLabel}>
                            {languageMode === 'en' ? "Photo / Document Attachment" : "ছবি / ডকুমেন্ট সংযুক্তি"}
                        </Text>
                        <Text style={styles.optionalLabel}>
                            {languageMode === 'en' ? "(Optional)" : "(ঐচ্ছিক)"}
                        </Text>
                    </View>
                    {!attachment ? (
                        <TouchableOpacity 
                            activeOpacity={0.7} 
                            style={styles.uploadBox}
                            onPress={handleFilePick}
                        >
                            <Upload size={moderateScale(32)} color="#9CA3AF" />
                            <Text style={styles.uploadText}>
                                {languageMode === 'en' ? "Upload File" : "ফাইল আপলোড করুন"}
                            </Text>
                            <Text style={styles.uploadSubtext}>
                                {languageMode === 'en' ? "JPG, PNG, PDF (Max 5MB)" : "JPG, PNG, PDF (সর্বোচ্চ ৫MB)"}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.filePreviewContainer}>
                            <View style={styles.fileInfo}>
                                {attachment.type?.includes('image') ? (
                                    <Image source={{ uri: attachment.uri }} style={styles.fileThumbnail} />
                                ) : (
                                    <View style={styles.fileIconPlaceholder}>
                                        <Text style={styles.fileExtensionText}>
                                            {attachment.fileName?.split('.').pop()?.toUpperCase() || 'FILE'}
                                        </Text>
                                    </View>
                                )}
                                <Text style={styles.fileName} numberOfLines={1}>
                                    {attachment.fileName || 'Attachment'}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={removeAttachment} style={styles.removeFileBtn}>
                                <X size={moderateScale(16)} color="#EF4444" />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.submitButton, isSubmitting && { opacity: 0.7 }]}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <>
                            <Send size={moderateScale(20)} color="white" />
                            <Text style={styles.submitText}>
                                {languageMode === 'en' ? "Submit Complaint" : "অভিযোগ জমা দিন"}
                            </Text>
                        </>
                    )}
                </TouchableOpacity>

                {/* Hotline Banner */}
                <HotlineBanner />
                <View style={styles.spacer} />
            </ScrollView>
        </AppBackground>
    );
};

const styles = ScaledSheet.create({
    scrollContent: {
        flex: 1,
        paddingHorizontal: '16@ms',
        paddingVertical: '16@vs',
    },
    privacyBanner: {
        backgroundColor: '#00897B',
        borderRadius: '12@ms',
        padding: '16@ms',
        marginBottom: '16@vs',
        flexDirection: 'row',
        alignItems: 'flex-start',
        elevation: 2,
    },
    privacyIconWrapper: {
        marginRight: '12@ms',
        marginTop: '2@vs',
    },
    privacyTextWrapper: {
        flex: 1,
    },
    privacyTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '16@ms',
        marginBottom: '4@vs',
        fontFamily: 'July-Bold',
    },
    privacyDescription: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '12@ms',
        lineHeight: '18@ms',
        fontFamily: 'July-Regular',
    },
    inputCard: {
        backgroundColor: 'white',
        borderRadius: '12@ms',
        padding: '16@ms',
        marginBottom: '16@vs',
        borderWidth: 1,
        borderColor: '#F3F4F6',
        elevation: 1,
    },
    inputHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '12@vs',
    },
    inputLabel: {
        color: '#374151',
        fontWeight: 'bold',
        fontSize: '16@ms',
        marginBottom: '8@vs',
        fontFamily: 'July-Bold',
    },
    optionalLabel: {
        color: '#9CA3AF',
        fontSize: '12@ms',
        marginLeft: '8@ms',
        marginBottom: '8@vs',
    },
    textInput: {
        backgroundColor: '#F9FAFB',
        borderRadius: '8@ms',
        paddingHorizontal: '16@ms',
        paddingVertical: '12@vs',
        fontSize: '14@ms',
        color: '#1F2937',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        fontFamily: 'July-Regular',
    },
    textArea: {
        minHeight: '120@vs',
    },
    inputFooterText: {
        color: '#9CA3AF',
        fontSize: '12@ms',
        marginTop: '8@vs',
        fontFamily: 'July-Regular',
    },
    uploadBox: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#D1D5DB',
        borderRadius: '12@ms',
        padding: '32@ms',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9FAFB',
    },
    uploadText: {
        color: '#4B5563',
        fontWeight: '500',
        fontSize: '14@ms',
        marginTop: '12@vs',
    },
    uploadSubtext: {
        color: '#9CA3AF',
        fontSize: '12@ms',
        marginTop: '4@vs',
    },
    filePreviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12@ms',
        backgroundColor: '#F3F4F6',
        borderRadius: '8@ms',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    fileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    fileThumbnail: {
        width: '40@ms',
        height: '40@ms',
        borderRadius: '6@ms',
        marginRight: '12@ms',
    },
    fileIconPlaceholder: {
        width: '40@ms',
        height: '40@ms',
        borderRadius: '6@ms',
        backgroundColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '12@ms',
    },
    fileExtensionText: {
        fontSize: '10@ms',
        fontWeight: 'bold',
        color: '#6B7280',
    },
    fileName: {
        color: '#374151',
        fontSize: '14@ms',
        flex: 1,
        marginRight: '8@ms',
        fontFamily: 'July-Regular',
    },
    removeFileBtn: {
        padding: '8@ms',
        backgroundColor: '#FEE2E2',
        borderRadius: '20@ms',
    },
    submitButton: {
        backgroundColor: '#E64A19',
        borderRadius: '12@ms',
        paddingVertical: '16@vs',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24@vs',
        elevation: 4,
        shadowColor: '#E64A19',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    submitText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18@ms',
        marginLeft: '8@ms',
        fontFamily: 'July-Bold',
    },
    spacer: {
        height: '16@vs',
    },
});

export default ComplaintScreen;

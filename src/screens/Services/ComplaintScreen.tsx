import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Header from '../../components/Header';
import { Lock, Upload, Send } from 'lucide-react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import HotlineBanner from '../../components/HotlineBanner';
import AppBackground from '../../components/AppBackground';
import { useMutation } from '@apollo/client/react';
import { CREATE_COMPLAIN } from '../../api/mutations';

const ComplaintScreen = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: '',
        description: '',
    });

    const [createComplain, { loading }] = useMutation(CREATE_COMPLAIN);

    const handleSubmit = async () => {
        if (!formData.description) {
            Alert.alert("সতর্কতা", "অনুগ্রহ করে ঘটনার বিবরণ লিখুন।");
            return;
        }

        try {
            const createComplainInput = {
                name: formData.name || 'Anonymous Reporter',
                phone: formData.phone,
                incidentAddress: formData.location,
                description: formData.description,
                // Providing default/empty values for other required fields if any
                isMinor: "NO",
                gender: "OTHER",
                suspectInfo: {
                    name: 'Unknown Suspect'
                }
            };

            const { data } = await createComplain({
                variables: { createComplainInput }
            });

            if (data) {
                Alert.alert(
                    "সফল",
                    "আপনার অভিযোগ সফলভাবে জমা দেওয়া হয়েছে।",
                    [{
                        text: "ঠিক আছে",
                        onPress: () => setFormData({
                            name: '',
                            phone: '',
                            location: '',
                            description: '',
                        })
                    }]
                );
            }
        } catch (error) {
            console.error('Submission error:', error);
            Alert.alert("ত্রুটি", "অভিযোগ জমা দেওয়া সম্ভব হয়নি। আবার চেষ্টা করুন।");
        }
    };

    return (
        <AppBackground>
            <Header title="অভিযোগ করুন" subtitle='আপনার তথ্য সম্পূর্ণ সুরক্ষিত থাকবে' showBackButton={true} />
            <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Privacy Warning Banner */}
                <View style={styles.privacyBanner}>
                    <View style={styles.privacyIconWrapper}>
                        <Lock size={moderateScale(20)} color="white" />
                    </View>
                    <View style={styles.privacyTextWrapper}>
                        <Text style={styles.privacyTitle}>গোপনীয়তা নিশ্চিত করা হবে</Text>
                        <Text style={styles.privacyDescription}>
                            আপনার পরিচয় এবং সকল তথ্য সম্পূর্ণ গোপন রাখা হবে। আপনার নিরাপত্তা আমাদের প্রথম অগ্রাধিকার।
                        </Text>
                    </View>
                </View>

                {/* Name Input */}
                <View style={styles.inputCard}>
                    <View style={styles.inputHeader}>
                        <Text style={styles.inputLabel}>অভিযোগকারীর নাম</Text>
                        <Text style={styles.optionalLabel}>(ঐচ্ছিক)</Text>
                    </View>
                    <TextInput
                        placeholder="আপনার নাম লিখুন"
                        style={styles.textInput}
                        placeholderTextColor="#9CA3AF"
                        value={formData.name}
                        onChangeText={(val) => setFormData({ ...formData, name: val })}
                    />
                    <Text style={styles.inputFooterText}>নাম না দিলেও অভিযোগ গ্রহণ করা হবে</Text>
                </View>

                {/* Mobile Input */}
                <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>মোবাইল নম্বর</Text>
                    <TextInput
                        placeholder="০১৭XXXXXXXX"
                        keyboardType="phone-pad"
                        style={styles.textInput}
                        placeholderTextColor="#9CA3AF"
                        value={formData.phone}
                        onChangeText={(val) => setFormData({ ...formData, phone: val })}
                    />
                </View>

                {/* Location Input */}
                <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>ঘটনার স্থান</Text>
                    <TextInput
                        placeholder="এলাকা, থানা, জেলা"
                        style={styles.textInput}
                        placeholderTextColor="#9CA3AF"
                        value={formData.location}
                        onChangeText={(val) => setFormData({ ...formData, location: val })}
                    />
                </View>

                {/* Description Input */}
                <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>ঘটনার বিবরণ</Text>
                    <TextInput
                        placeholder="ঘটনা সম্পর্কে বিস্তারিত লিখুন..."
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
                        <Text style={styles.inputLabel}>ছবি / ডকুমেন্ট সংযুক্তি</Text>
                        <Text style={styles.optionalLabel}>(ঐচ্ছিক)</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} style={styles.uploadBox}>
                        <Upload size={moderateScale(32)} color="#9CA3AF" />
                        <Text style={styles.uploadText}>ফাইল আপলোড করুন</Text>
                        <Text style={styles.uploadSubtext}>JPG, PNG, PDF (সর্বোচ্চ ৫MB)</Text>
                    </TouchableOpacity>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.submitButton, loading && { opacity: 0.7 }]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <>
                            <Send size={moderateScale(20)} color="white" />
                            <Text style={styles.submitText}>অভিযোগ জমা দিন</Text>
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

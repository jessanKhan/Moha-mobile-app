import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { Lock, Upload, Send } from 'lucide-react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import HotlineBanner from '../../components/HotlineBanner';

const ComplaintScreen = () => {
    return (
        <View style={styles.container}>
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
                    />
                </View>

                {/* Location Input */}
                <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>ঘটনার স্থান</Text>
                    <TextInput
                        placeholder="এলাকা, থানা, জেলা"
                        style={styles.textInput}
                        placeholderTextColor="#9CA3AF"
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
                <TouchableOpacity activeOpacity={0.8} style={styles.submitButton}>
                    <Send size={moderateScale(20)} color="white" />
                    <Text style={styles.submitText}>অভিযোগ জমা দিন</Text>
                </TouchableOpacity>

                {/* Hotline Banner */}
                <HotlineBanner />
                <View style={styles.spacer} />
            </ScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
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
    },
    privacyDescription: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '12@ms',
        lineHeight: '18@ms',
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
    },
    textArea: {
        minHeight: '120@vs',
    },
    inputFooterText: {
        color: '#9CA3AF',
        fontSize: '12@ms',
        marginTop: '8@vs',
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
    },
    spacer: {
        height: '16@vs',
    },
});

export default ComplaintScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { WifiOff, RefreshCw } from 'lucide-react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const { width, height } = Dimensions.get('window');

const NetworkStatusHandler = ({ children }: { children: React.ReactNode }) => {
    const [isConnected, setIsConnected] = useState<boolean | null>(true);
    const [prevConnected, setPrevConnected] = useState<boolean | null>(true);
    const languageMode = useSelector((state: RootState) => state.language.mode);
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
            
            if (state.isConnected) {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            } else {
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            }
        });

        return () => unsubscribe();
    }, []);

    const handleRetry = () => {
        NetInfo.refresh().then(state => {
            setIsConnected(state.isConnected);
        });
    };

    return (
        <View style={{ flex: 1 }}>
            {children}
            
            {!isConnected && (
                <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                    <View style={styles.card}>
                        <View style={styles.iconContainer}>
                            <WifiOff size={moderateScale(48)} color="#EF4444" />
                        </View>
                        
                        <Text style={styles.title}>
                            {languageMode === 'en' ? "No Internet Connection" : "ইন্টারনেট সংযোগ নেই"}
                        </Text>
                        
                        <Text style={styles.description}>
                            {languageMode === 'en' 
                                ? "Please check your network settings and try again." 
                                : "অনুগ্রহ করে আপনার নেটওয়ার্ক সেটিংস পরীক্ষা করুন এবং আবার চেষ্টা করুন।"}
                        </Text>

                        <TouchableOpacity 
                            style={styles.retryButton} 
                            onPress={handleRetry}
                            activeOpacity={0.8}
                        >
                            <RefreshCw size={moderateScale(18)} color="white" style={{ marginRight: 8 }} />
                            <Text style={styles.retryText}>
                                {languageMode === 'en' ? "Retry" : "আবার চেষ্টা করুন"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}
        </View>
    );
};

const styles = ScaledSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    card: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: '24@ms',
        padding: '32@ms',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
    },
    iconContainer: {
        width: '80@ms',
        height: '80@ms',
        backgroundColor: '#FEE2E2',
        borderRadius: '40@ms',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '24@vs',
    },
    title: {
        fontSize: '20@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        textAlign: 'center',
        marginBottom: '12@vs',
        fontFamily: 'July-Bold',
    },
    description: {
        fontSize: '14@ms',
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: '22@ms',
        marginBottom: '32@vs',
        fontFamily: 'July-Regular',
    },
    retryButton: {
        backgroundColor: '#E64A19',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '12@vs',
        paddingHorizontal: '24@ms',
        borderRadius: '12@ms',
    },
    retryText: {
        color: 'white',
        fontSize: '16@ms',
        fontWeight: '600',
        fontFamily: 'July-Bold',
    }
});

export default NetworkStatusHandler;

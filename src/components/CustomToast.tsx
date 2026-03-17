import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, View, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';

const { width } = Dimensions.get('window');

export type ToastType = 'success' | 'error' | 'info';

interface CustomToastProps {
    message: string;
    type?: ToastType;
    onHide: () => void;
    duration?: number;
}

const CustomToast = ({ message, type = 'success', onHide, duration = 3000 }: CustomToastProps) => {
    const insets = useSafeAreaInsets();
    const translateY = useRef(new Animated.Value(-100)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Show animation
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: (insets.top || moderateScale(20)) + moderateScale(20),
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();

        // Hide animation after duration
        const timer = setTimeout(() => {
            hideToast();
        }, duration);

        return () => clearTimeout(timer);
    }, []);

    const hideToast = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -100,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onHide();
        });
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle2 size={moderateScale(20)} color="#10B981" />;
            case 'error':
                return <AlertCircle size={moderateScale(20)} color="#EF4444" />;
            case 'info':
                return <Info size={moderateScale(20)} color="#3B82F6" />;
        }
    };

    const getBackgroundColor = () => {
        switch (type) {
            case 'success': return '#ECFDF5';
            case 'error': return '#FEF2F2';
            case 'info': return '#EFF6FF';
        }
    };

    const getBorderColor = () => {
        switch (type) {
            case 'success': return '#10B981';
            case 'error': return '#EF4444';
            case 'info': return '#3B82F6';
        }
    };

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateY }],
                    opacity,
                    backgroundColor: getBackgroundColor(),
                    borderColor: getBorderColor(),
                },
            ]}
        >
            <View style={styles.content}>
                {getIcon()}
                <Text style={styles.message}>{message}</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: moderateScale(20),
        right: moderateScale(20),
        padding: moderateScale(16),
        borderRadius: moderateScale(12),
        borderLeftWidth: moderateScale(4),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        zIndex: 9999,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(12),
    },
    message: {
        fontSize: moderateScale(14),
        color: '#1F2937',
        fontWeight: '600',
        flex: 1,
        fontFamily: 'July-Bold',
    },
});

export default CustomToast;

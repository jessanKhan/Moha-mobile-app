import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

interface AppBackgroundProps {
    children: React.ReactNode;
}

const AppBackground = ({ children }: AppBackgroundProps) => {
    return (
        <View style={styles.container}>
            {/* Top Left Blob - Translucent Blue */}
            <LinearGradient
                colors={['#CEE1FC66', 'transparent']}
                style={[styles.blob, styles.topLeft]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            {/* Top Right Blob - Solid Pinkish */}
            <LinearGradient
                colors={['#ffe6f4ff', 'transparent']}
                style={[styles.blob, styles.topRight]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
            />

            {/* Bottom Left Blob - Solid Greenish */}
            <LinearGradient
                colors={['#f0ffe3ff', 'transparent']}
                style={[styles.blob, styles.bottomLeft]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
            />

            {/* Bottom Right Blob - Translucent Orange/Pink */}
            <LinearGradient
                colors={['#ffcdd456', 'transparent']}
                style={[styles.blob, styles.bottomRight]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
            />

            {/* Content wrapper to ensure it stays on top */}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        zIndex: 1,
    },
    blob: {
        position: 'absolute',
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        zIndex: 0,
    },
    topLeft: {
        top: -width * 0.2,
        left: -width * 0.2,
    },
    topRight: {
        top: -width * 0.2,
        right: -width * 0.2,
    },
    bottomLeft: {
        bottom: -width * 0.2,
        left: -width * 0.2,
    },
    bottomRight: {
        bottom: -width * 0.2,
        right: -width * 0.2,
    },
});

export default AppBackground;

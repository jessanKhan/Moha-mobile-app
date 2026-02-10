import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

interface AppBackgroundProps {
    children: React.ReactNode;
}

const AppBackground = ({ children }: AppBackgroundProps) => {
    return (
        <View style={styles.container}>
            {/* Bottom Left Gradient Box */}
            <LinearGradient
                colors={['#f0ffe3ff', '#CEE1FC66']} // 66 is ~40% opacity
                style={styles.gradientBox}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
            />

            {/* Top Right Gradient Box */}
            <LinearGradient
                colors={['#ffcdd456', '#ffe6f4ff']}
                style={styles.gradientBoxTop}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
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
    gradientBox: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
    },
    gradientBoxTop: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: width * 0.5,
        height: width * 0.5,
        zIndex: 0,
    },
});

export default AppBackground;

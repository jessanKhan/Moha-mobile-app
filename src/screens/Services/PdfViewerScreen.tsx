import React from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../../components/Header';
import AppBackground from '../../components/AppBackground';
import { useRoute } from '@react-navigation/native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';

const PdfViewerScreen = () => {
    const route = useRoute<any>();
    const { url, title } = route.params || {};

    const pdfUrl = Platform.OS === 'android'
        ? `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`
        : url;

    return (
        <AppBackground>
            <Header
                title={title || "PDF Viewer"}
                showBackButton={true}
            />
            <View style={styles.container}>
                <WebView
                    source={{ uri: pdfUrl }}
                    style={styles.webview}
                    startInLoadingState={true}
                    renderLoading={() => (
                        <View style={styles.loader}>
                            <ActivityIndicator size="large" color="#1E3A8A" />
                        </View>
                    )}
                    // Google Docs Viewer helps rendering PDFs on Android especially
                    originWhitelist={['*']}
                    scalesPageToFit={true}
                />
            </View>
        </AppBackground>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    webview: {
        flex: 1,
    },
    loader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
});

export default PdfViewerScreen;

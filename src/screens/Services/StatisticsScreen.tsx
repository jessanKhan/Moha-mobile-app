import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Header from '../../components/Header';
import { Filter, Search, BarChart3, Users, Scale, PhoneCall, Handshake, FileText, Newspaper, ShieldCheck, Link as LinkIcon } from 'lucide-react-native';
import { LineChart, BarChart, PieChart } from 'react-native-gifted-charts';
import { Text as SvgText } from 'react-native-svg';
import { ScaledSheet, scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { barData1, lineData1, lineData2, lineData3, barData2, pieData } from '../../data/statisticsData';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const StatisticsScreen = () => {
    const renderRightComponent = () => (
        <TouchableOpacity activeOpacity={0.8} style={styles.filterBtn}>
            <Filter size={moderateScale(16)} color="white" />
            <Text style={styles.filterText}>ফিল্টার</Text>
        </TouchableOpacity>
    );

    const SummaryCard = ({ icon: Icon, count, title, colors }: any) => (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.summaryCard}
        >
            <View style={styles.iconWrapper}>
                <Icon size={moderateScale(24)} color="white" />
            </View>
            <View>
                <Text style={styles.countText}>{count}</Text>
                <Text style={styles.titleText}>{title}</Text>
            </View>
        </LinearGradient>
    );

    const ChartCard = ({ title, children, fullWidth = false }: any) => (
        <View style={[styles.card, fullWidth ? styles.fullWidthCard : styles.marginCard]}>
            <Text style={styles.chartTitle}>{title}</Text>
            {children}
        </View>
    );

    return (
        <View style={styles.container}>
            <Header
                title="পরিসংখ্যান"
                subtitle="মানব পাচার প্রতিরোধ তথ্য ও উপাত্ত"
                showBackButton={true}
                rightComponent={renderRightComponent()}
            />
            <ScrollView style={styles.flex1} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Summary Cards Grid */}
                <View style={styles.gridContainer}>
                    <SummaryCard
                        icon={BarChart3}
                        count="১,২৪৫"
                        title="মোট রিপোর্টকৃত অভিযোগ"
                        colors={['#155DFC', '#1447E6']}
                    />
                    <SummaryCard
                        icon={Users}
                        count="৮৭৩"
                        title="উদ্ধারপ্রাপ্ত ভুক্তভোগী"
                        colors={['#009689', '#00786F']}
                    />
                    <SummaryCard
                        icon={Search}
                        count="১৫৬"
                        title="চলমান তদন্ত সংখ্যা"
                        colors={['#FA6700', '#C53B00']}
                    />
                    <SummaryCard
                        icon={ShieldCheck}
                        count="৩৪২"
                        title="সচেতনতামূলক কার্যক্রম"
                        colors={['#00A63E', '#008236']}
                    />
                </View>

                {/* Rescue Report Chart */}
                <ChartCard title="উদ্ধার প্রতিবেদন">
                    <BarChart
                        barWidth={scale(35)}
                        noOfSections={3}
                        barBorderRadius={4}
                        frontColor="#14B8A6"
                        data={barData1}
                        yAxisThickness={0}
                        xAxisThickness={1}
                        xAxisColor={'#E5E7EB'}
                        hideRules
                        height={verticalScale(180)}
                        width={screenWidth - scale(60)}
                        xAxisLabelTextStyle={{ color: '#6B7280', fontSize: moderateScale(10) }}
                    />
                </ChartCard>

                {/* Incident Trends Chart */}
                <ChartCard title="সময়ভিত্তিক ঘটনার প্রবণতা">
                    <LineChart
                        data={lineData1}
                        data2={lineData2}
                        data3={lineData3}
                        height={verticalScale(180)}
                        width={screenWidth - scale(60)}
                        initialSpacing={scale(20)}
                        color1="#3B82F6"
                        color2="#14B8A6"
                        color3="#F59E0B"
                        textColor1="green"
                        dataPointsColor1="#3B82F6"
                        dataPointsColor2="#14B8A6"
                        dataPointsColor3="#F59E0B"
                        curved
                        startFillColor1="#3B82F6"
                        startFillColor2="#14B8A6"
                        startFillColor3="#F59E0B"
                        startOpacity={0.1}
                        endOpacity={0.1}
                        hideRules
                        hideYAxisText={false}
                        yAxisThickness={0}
                        xAxisThickness={1}
                        xAxisColor={'#E5E7EB'}
                    />
                    <View style={styles.legendContainer}>
                        <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} /><Text style={styles.legendText}>উদ্ধার</Text></View>
                        <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#14B8A6' }]} /><Text style={styles.legendText}>চলমান</Text></View>
                        <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} /><Text style={styles.legendText}>রিপোর্ট</Text></View>
                    </View>
                </ChartCard>

                {/* Analysis Type Chart */}
                <ChartCard title="ঘটনার ধরন অনুযায়ী বিশ্লেষণ">
                    <BarChart
                        barWidth={scale(45)}
                        noOfSections={4}
                        maxValue={100}
                        barBorderRadius={4}
                        data={barData2}
                        yAxisThickness={1}
                        yAxisColor={'#9CA3AF'}
                        xAxisThickness={1}
                        xAxisColor={'#9CA3AF'}
                        rulesType="dashed"
                        rulesColor={'#E5E7EB'}
                        height={verticalScale(180)}
                        width={screenWidth - scale(60)}
                        spacing={(screenWidth - scale(80) - (scale(45) * 4)) / 4}
                        initialSpacing={scale(20)}
                        xAxisLabelTextStyle={{ color: '#6B7280', fontSize: moderateScale(10), width: scale(60), textAlign: 'center' }}
                        yAxisTextStyle={{ color: '#6B7280', fontSize: moderateScale(10) }}
                    />
                </ChartCard>

                {/* Pie Chart */}
                <ChartCard title="বয়স ও লিঙ্গভিত্তিক তথ্য">
                    <View style={styles.pieContainer}>
                        <PieChart
                            data={pieData}
                            donut={false}
                            showExternalLabels
                            radius={scale(100)}
                            labelsPosition="outward"
                            externalLabelComponent={(item: any) => (
                                <SvgText
                                    fill={item.textColor}
                                    fontSize={moderateScale(11)}
                                    fontWeight="bold"
                                    x={item.shiftTextX || 0}
                                    y={item.shiftTextY || 0}
                                >
                                    {item.text}
                                </SvgText>
                            )}
                        />
                    </View>
                </ChartCard>
            </ScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    flex1: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: '40@vs',
    },
    filterBtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        paddingHorizontal: '12@ms',
        paddingVertical: '6@vs',
        borderRadius: '20@ms',
    },
    filterText: {
        color: 'white',
        fontWeight: '500',
        fontSize: '12@ms',
        marginLeft: '8@ms',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: '16@ms',
        paddingTop: '20@vs',
    },
    summaryCard: {
        width: '48%',
        height: '150@vs',
        padding: '16@ms',
        borderRadius: '20@ms',
        marginBottom: '16@vs',
        justifyContent: 'space-between',
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    iconWrapper: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignSelf: 'flex-start',
        borderRadius: '12@ms',
        padding: '10@ms',
    },
    countText: {
        color: 'white',
        fontSize: '24@ms',
        fontWeight: 'bold',
        marginBottom: '4@vs',
    },
    titleText: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '12@ms',
        fontWeight: '500',
    },
    card: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    marginCard: {
        marginHorizontal: '16@ms',
        marginBottom: '20@vs',
        borderRadius: '20@ms',
        padding: '16@ms',
    },
    fullWidthCard: {
        marginBottom: '20@vs',
        paddingTop: '20@vs',
    },
    chartTitle: {
        color: '#1F2937',
        fontSize: '18@ms',
        fontWeight: 'bold',
        marginBottom: '20@vs',
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '20@vs',
        paddingBottom: '10@vs',
        gap: '16@ms',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendDot: {
        width: '8@ms',
        height: '8@ms',
        borderRadius: '4@ms',
        marginRight: '8@ms',
    },
    legendText: {
        color: '#6B7280',
        fontSize: '12@ms',
    },
    pieContainer: {
        alignItems: 'center',
        paddingVertical: '20@vs',
    },
});

export default StatisticsScreen;

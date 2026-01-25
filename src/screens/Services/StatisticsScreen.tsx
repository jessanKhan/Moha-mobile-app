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
        <TouchableOpacity className="bg-white/20 flex-row items-center border border-white/30" style={styles.filterBtn}>
            <Filter size={moderateScale(16)} color="white" />
            <Text className="text-white font-medium" style={styles.filterText}>ফিল্টার</Text>
        </TouchableOpacity>
    );

    const SummaryCard = ({ icon: Icon, count, title, colors }: any) => (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="w-[48%] flex justify-between"
            style={styles.summaryCard}
        >
            <View className="bg-white/20 self-start rounded-xl" style={styles.iconWrapper}>
                <Icon size={moderateScale(24)} color="white" />
            </View>
            <View>
                <Text className="text-white font-bold" style={styles.countText}>{count}</Text>
                <Text className="text-white/90 font-medium" style={styles.titleText}>{title}</Text>
            </View>
        </LinearGradient>
    );

    const ChartCard = ({ title, children, fullWidth = false }: any) => (
        <View className={`bg-white dark:bg-zinc-900 shadow-sm ${fullWidth ? 'mb-4' : 'mx-4 mb-4'}`} style={!fullWidth && styles.cardRounded}>
            <Text className={`text-gray-800 dark:text-white font-bold ${fullWidth ? 'px-4 pt-4' : ''}`} style={styles.chartTitle}>{title}</Text>
            {children}
        </View>
    );

    return (
        <View className="flex-1 bg-gray-50 dark:bg-black">
            <Header
                title="পরিসংখ্যান"
                subtitle="মানব পাচার প্রতিরোধ তথ্য ও উপাত্ত"
                showBackButton={true}
                rightComponent={renderRightComponent()}
            />
            <ScrollView className="flex-1" contentContainerStyle={styles.scrollContent}>
                {/* Summary Cards Grid */}
                <View className="flex-row flex-wrap justify-between" style={styles.gridContainer}>
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
                        height={verticalScale(200)}
                        width={screenWidth - scale(20)}
                        xAxisLabelTextStyle={{ color: '#6B7280', fontSize: moderateScale(10) }}
                    />
                </ChartCard>

                {/* Incident Trends Chart */}
                <ChartCard title="সময়ভিত্তিক ঘটনার প্রবণতা">
                    <LineChart
                        data={lineData1}
                        data2={lineData2}
                        data3={lineData3}
                        height={verticalScale(200)}
                        width={screenWidth - scale(20)}
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
                    <View className="flex-row justify-center mt-4 pb-4" style={{ gap: scale(16) }}>
                        <View className="flex-row items-center"><View className="rounded-full bg-blue-500 mr-2" style={styles.legendDot} /><Text className="text-gray-500" style={styles.legendText}>উদ্ধার</Text></View>
                        <View className="flex-row items-center"><View className="rounded-full bg-teal-500 mr-2" style={styles.legendDot} /><Text className="text-gray-500" style={styles.legendText}>চলমান</Text></View>
                        <View className="flex-row items-center"><View className="rounded-full bg-orange-500 mr-2" style={styles.legendDot} /><Text className="text-gray-500" style={styles.legendText}>রিপোর্ট</Text></View>
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
                        height={verticalScale(200)}
                        width={screenWidth - scale(20)}
                        spacing={(screenWidth - scale(40) - (scale(45) * 4)) / 4}
                        initialSpacing={scale(20)}
                        xAxisLabelTextStyle={{ color: '#6B7280', fontSize: moderateScale(10), width: scale(60), textAlign: 'center' }}
                        yAxisTextStyle={{ color: '#6B7280', fontSize: moderateScale(10) }}
                    />
                </ChartCard>

                {/* Pie Chart */}
                <ChartCard title="বয়স ও লিঙ্গভিত্তিক তথ্য">
                    <View className="items-center py-6">
                        <PieChart
                            data={pieData}
                            donut={false}
                            showExternalLabels
                            radius={scale(120)}
                            labelsPosition="outward"
                            externalLabelComponent={(item: any) => (
                                <SvgText
                                    fill={item.textColor}
                                    fontSize={moderateScale(12)}
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
    filterBtn: {
        paddingHorizontal: '12@s',
        paddingVertical: '6@vs',
        borderRadius: '20@ms'
    },
    filterText: {
        fontSize: '12@ms',
        marginLeft: '8@s'
    },
    scrollContent: {
        paddingBottom: '100@vs'
    },
    gridContainer: {
        padding: '16@ms',
        paddingTop: '24@vs'
    },
    summaryCard: {
        height: '160@vs',
        padding: '16@ms',
        borderRadius: '20@ms',
        marginBottom: '16@vs',
        overflow: 'hidden'
    },
    iconWrapper: {
        padding: '8@ms'
    },
    countText: {
        fontSize: '24@ms',
        marginBottom: '4@vs'
    },
    titleText: {
        fontSize: '12@ms'
    },
    cardRounded: {
        borderRadius: '20@ms',
        padding: '16@ms'
    },
    chartTitle: {
        fontSize: '18@ms',
        marginBottom: '24@vs'
    },
    legendDot: {
        width: '8@ms',
        height: '8@ms'
    },
    legendText: {
        fontSize: '12@ms'
    }
});

export default StatisticsScreen;

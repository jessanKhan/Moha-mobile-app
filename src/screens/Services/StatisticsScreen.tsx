import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { Filter, Search, BarChart3, Users, ShieldCheck } from 'lucide-react-native';
import { LineChart, BarChart, PieChart } from 'react-native-gifted-charts';
import { Text as SvgText } from 'react-native-svg';
import { ScaledSheet, scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import AppBackground from '../../components/AppBackground';
import { useQuery } from '@apollo/client/react';
import { REPORT_TABLES_QUERY } from '../../api/queries';

const screenWidth = Dimensions.get('window').width;

// Helper to check if a string is numeric
const isNumeric = (str: string) => {
    if (typeof str !== 'string') return false;
    return !isNaN(str as any) && !isNaN(parseFloat(str));
};

const StatisticsScreen = () => {
    const { data, loading, error } = useQuery<any>(REPORT_TABLES_QUERY);

    // States for filtering
    const [selectedName, setSelectedName] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

    // Chart states
    const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
    const [xKey, setXKey] = useState<string | null>(null);
    const [yKey, setYKey] = useState<string | null>(null);

    const reportTables = data?.reportTables || [];

    // Unique report names
    const reportNames = useMemo(() => {
        return [...new Set(reportTables?.map((r: any) => r.name) || [])] as string[];
    }, [reportTables]);

    // Set initial selected name if available
    useEffect(() => {
        if (!selectedName && reportNames.length > 0) {
            setSelectedName(reportNames[0]);
        }
    }, [reportNames, selectedName]);

    // Filter years based on selected name
    const availableYears = useMemo(() => {
        if (!selectedName) return [];

        const years = reportTables
            ?.filter((r: any) => r.name === selectedName)
            .map((r: any) => r.year);

        return [...new Set(years)].sort((a: any, b: any) => Number(b) - Number(a)) as string[]; // latest first
    }, [reportTables, selectedName]);

    // Set initial selected year if available
    useEffect(() => {
        if (!selectedYear && availableYears.length > 0) {
            setSelectedYear(availableYears[0]);
        } else if (selectedYear && !availableYears.includes(selectedYear)) {
            // Reset year if it's not valid for the newly selected report
            setSelectedYear(availableYears.length > 0 ? availableYears[0] : null);
        }
    }, [availableYears, selectedYear]);

    // Get filtered table
    const table = useMemo(() => {
        return reportTables?.find(
            (r: any) => r.name === selectedName && r.year === selectedYear
        );
    }, [reportTables, selectedName, selectedYear]);

    // Auto select all columns
    useEffect(() => {
        if (table?.columns) {
            setSelectedColumns(table.columns.map((c: any) => c.key));
        }
    }, [table]);

    // Separate numeric & categorical columns
    const numericColumns = useMemo(
        () => {
            if (!table?.columns) return [];
            return table.columns.filter((col: any) =>
                table.rows.some((row: any) => {
                    const val = row.data[col.key]?.en || row.data[col.key]?.bn;
                    return isNumeric(val);
                })
            );
        },
        [table]
    );

    const categoricalColumns = useMemo(
        () => {
            if (!table?.columns) return [];
            return table.columns.filter((col: any) =>
                table.rows.some((row: any) => {
                    const val = row.data[col.key]?.en || row.data[col.key]?.bn;
                    return !isNumeric(val) || val === undefined;
                })
            );
        },
        [table]
    );

    // Set default keys if available
    useEffect(() => {
        if (categoricalColumns.length > 0 && !xKey) {
            setXKey(categoricalColumns[0].key);
        }
        if (numericColumns.length > 0 && !yKey) {
            setYKey(numericColumns[0].key);
        }
    }, [categoricalColumns, numericColumns, xKey, yKey]);

    // Reset keys if table changes and keys are no longer valid
    useEffect(() => {
        // Optionally you can check if xKey presents in table.columns
        // But setting it empty if table changed can be safer
        if (table) {
            setXKey(null);
            setYKey(null);
        }
    }, [table?.id]);

    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c", "#14B8A6", "#3B82F6", "#F59E0B"];


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
        <AppBackground>
            <Header
                title="পরিসংখ্যান"
                subtitle="মানব পাচার প্রতিরোধ তথ্য ও উপাত্ত"
                showBackButton={true}
            // rightComponent={renderRightComponent()}
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

                {loading && <ActivityIndicator size="large" color="#155DFC" style={{ marginVertical: scale(20) }} />}
                {!loading && table && (
                    <>
                        {/* Filters Dropdown Pickers - You'll likely want to create custom Pickers for React Native */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterTitle}>প্রতিবেদন নির্বাচন করুন</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: scale(15) }}>
                                {reportNames.map((name) => (
                                    <TouchableOpacity
                                        key={name}
                                        style={[styles.chip, selectedName === name && styles.chipActive]}
                                        onPress={() => setSelectedName(name)}
                                    >
                                        <Text style={[styles.chipText, selectedName === name && styles.chipTextActive]}>{name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            {availableYears.length > 0 && <Text style={styles.filterTitle}>বছর নির্বাচন করুন</Text>}
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: scale(15) }}>
                                {availableYears.map((yr) => (
                                    <TouchableOpacity
                                        key={yr}
                                        style={[styles.chip, selectedYear === yr && styles.chipActive]}
                                        onPress={() => setSelectedYear(yr)}
                                    >
                                        <Text style={[styles.chipText, selectedYear === yr && styles.chipTextActive]}>{yr}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        <ChartCard title={table.nameBn || table.name}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View>
                                    {/* Header Row */}
                                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingBottom: scale(10) }}>
                                        {table.columns.filter((col: any) => selectedColumns.includes(col.key)).map((col: any) => (
                                            <View key={col.key} style={{ width: scale(120), paddingHorizontal: scale(5) }}>
                                                <Text style={{ fontSize: moderateScale(11), fontWeight: 'bold', color: '#1F2937', fontFamily: 'July-Bold' }}>
                                                    {col.bn || col.en}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                    {/* Data Rows */}
                                    {table.rows.map((row: any) => (
                                        <View key={row.id} style={{ flexDirection: 'row', paddingVertical: scale(10), borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}>
                                            {table.columns.filter((col: any) => selectedColumns.includes(col.key)).map((col: any) => (
                                                <View key={col.key} style={{ width: scale(120), paddingHorizontal: scale(5) }}>
                                                    <Text style={{ fontSize: moderateScale(11), color: '#6B7280', fontFamily: 'July-Regular' }}>
                                                        {row.data[col.key]?.bn || row.data[col.key]?.en || '-'}
                                                    </Text>
                                                </View>
                                            ))}
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        </ChartCard>

                        {/* Chart Preview Type Selectors */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterTitle}>চার্টের ধরন</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: scale(15) }}>
                                {["bar", "line", "pie"].map((type) => (
                                    <TouchableOpacity
                                        key={type}
                                        style={[styles.chip, chartType === type && styles.chipActive]}
                                        onPress={() => setChartType(type as any)}
                                    >
                                        <Text style={[styles.chipText, chartType === type && styles.chipTextActive]}>{type.toUpperCase()}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            <Text style={styles.filterTitle}>X-axis</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: scale(15) }}>
                                {categoricalColumns.map((col: any) => (
                                    <TouchableOpacity
                                        key={col.key}
                                        style={[styles.chip, xKey === col.key && styles.chipActive]}
                                        onPress={() => setXKey(col.key)}
                                    >
                                        <Text style={[styles.chipText, xKey === col.key && styles.chipTextActive]}>{col.bn || col.en}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            <Text style={styles.filterTitle}>Y-axis</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: scale(15) }}>
                                {numericColumns.map((col: any) => (
                                    <TouchableOpacity
                                        key={col.key}
                                        style={[styles.chip, yKey === col.key && styles.chipActive]}
                                        onPress={() => setYKey(col.key)}
                                    >
                                        <Text style={[styles.chipText, yKey === col.key && styles.chipTextActive]}>{col.bn || col.en}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        {/* Dynamic Chart */}
                        {xKey && yKey && (
                            <ChartCard title="Chart Preview">
                                {chartType === 'bar' && (
                                    <BarChart
                                        barWidth={scale(35)}
                                        noOfSections={4}
                                        barBorderRadius={4}
                                        frontColor="#14B8A6"
                                        data={table.rows.map((row: any) => ({
                                            value: Number(row.data[yKey]?.en || 0),
                                            label: (row.data[xKey]?.bn || row.data[xKey]?.en || "-").substring(0, 5) + "..."
                                        }))}
                                        yAxisThickness={0}
                                        xAxisThickness={1}
                                        xAxisColor={'#E5E7EB'}
                                        hideRules
                                        height={verticalScale(180)}
                                        width={screenWidth - scale(60)}
                                        xAxisLabelTextStyle={{ color: '#6B7280', fontSize: moderateScale(9), width: scale(50), textAlign: 'center' }}
                                    />
                                )}
                                {chartType === 'line' && (
                                    <LineChart
                                        data={table.rows.map((row: any) => ({
                                            value: Number(row.data[yKey]?.en || 0),
                                            label: (row.data[xKey]?.bn || row.data[xKey]?.en || "-").substring(0, 5) + "..."
                                        }))}
                                        height={verticalScale(180)}
                                        width={screenWidth - scale(60)}
                                        initialSpacing={scale(20)}
                                        color1="#3B82F6"
                                        dataPointsColor1="#3B82F6"
                                        startFillColor1="#3B82F6"
                                        startOpacity={0.1}
                                        endOpacity={0.1}
                                        hideRules
                                        yAxisThickness={0}
                                        xAxisThickness={1}
                                        xAxisColor={'#E5E7EB'}
                                        xAxisLabelTextStyle={{ color: '#6B7280', fontSize: moderateScale(9), width: scale(50), textAlign: 'center' }}
                                    />
                                )}
                                {chartType === 'pie' && (
                                    <View style={styles.pieContainer}>
                                        <PieChart
                                            data={table.rows.map((row: any, index: number) => ({
                                                value: Number(row.data[yKey]?.en || 0),
                                                text: (row.data[xKey]?.bn || row.data[xKey]?.en || "-").substring(0, 5),
                                                color: COLORS[index % COLORS.length]
                                            }))}
                                            donut={false}
                                            showExternalLabels
                                            radius={scale(100)}
                                            labelsPosition="outward"
                                            externalLabelComponent={(item: any) => (
                                                <SvgText
                                                    fill={"#1F2937"}
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
                                )}
                            </ChartCard>
                        )}
                    </>
                )}
            </ScrollView>
        </AppBackground>
    );
};

const styles = ScaledSheet.create({
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
        fontFamily: 'July-Regular',
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
        fontFamily: 'July-Bold',
    },
    titleText: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '12@ms',
        fontWeight: '500',
        fontFamily: 'July-Regular',
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
        fontFamily: 'July-Bold',
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
        fontFamily: 'July-Regular',
    },
    pieContainer: {
        alignItems: 'center',
        paddingVertical: '20@vs',
    },
    filterSection: {
        marginHorizontal: '16@ms',
        marginBottom: '10@vs',
    },
    filterTitle: {
        color: '#314158',
        fontSize: '14@ms',
        fontWeight: '600',
        marginBottom: '8@vs',
        fontFamily: 'July-Medium',
    },
    chip: {
        paddingHorizontal: '16@ms',
        paddingVertical: '8@vs',
        borderRadius: '20@ms',
        backgroundColor: '#F3F4F6',
        marginRight: '8@ms',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    chipActive: {
        backgroundColor: '#E0F2FE',
        borderColor: '#3B82F6',
    },
    chipText: {
        color: '#4B5563',
        fontSize: '12@ms',
        fontFamily: 'July-Regular',
    },
    chipTextActive: {
        color: '#1D4ED8',
        fontFamily: 'July-Bold',
        fontWeight: '600',
    },
});

export default StatisticsScreen;

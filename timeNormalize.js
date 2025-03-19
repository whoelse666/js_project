/**
 * 时间格式归一化函数
 * 支持多种时间格式的统一转换
 * 
 * @param {string|number|Date} time - 输入的时间值
 * @param {Object} options - 配置选项
 * @param {string} [options.format='timestamp'] - 输出格式 ('timestamp'|'iso'|'date'|'YYYYMMDDHHmmss')
 * @param {string} [options.timezone='local'] - 时区设置 ('local'|'utc')
 * @returns {string|number} 归一化后的时间
 * @throws {Error} 当输入的时间格式无法解析时抛出错误
 */
function normalizeTime(time, options = {}) {
    const {
        format = 'timestamp',
        timezone = 'local'
    } = options;

    // 将输入转换为 Date 对象
    let date;
    try {
        date = parseTimeInput(time);
    } catch (error) {
        throw new Error(`无法解析时间格式: ${time}`);
    }

    // 根据指定格式返回结果
    return formatTime(date, format, timezone);
}

/**
 * 解析各种时间输入格式
 * @param {string|number|Date} input - 输入的时间值
 * @returns {Date} 解析后的Date对象
 */
function parseTimeInput(input) {
    if (input instanceof Date) {
        return input;
    }

    if (typeof input === 'number') {
        // 处理时间戳（毫秒）
        return new Date(input);
    }

    if (typeof input === 'string') {
        // 移除所有空白字符
        input = input.trim();

        // 处理常见的日期格式
        if (/^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/.test(input)) {
            // YYYY-MM-DD 或 YYYY/MM/DD
            return new Date(input.replace(/\//g, '-'));
        }

        if (/^\d{8}$/.test(input)) {
            // YYYYMMDD
            return new Date(
                input.slice(0, 4) + '-' + 
                input.slice(4, 6) + '-' + 
                input.slice(6, 8)
            );
        }

        if (/^\d{14}$/.test(input)) {
            // YYYYMMDDHHmmss
            return new Date(
                input.slice(0, 4) + '-' + 
                input.slice(4, 6) + '-' + 
                input.slice(6, 8) + ' ' +
                input.slice(8, 10) + ':' +
                input.slice(10, 12) + ':' +
                input.slice(12, 14)
            );
        }

        // ISO格式或其他标准格式
        return new Date(input);
    }

    throw new Error('不支持的时间格式');
}

/**
 * 格式化时间
 * @param {Date} date - Date对象
 * @param {string} format - 输出格式
 * @param {string} timezone - 时区设置
 * @returns {string|number} 格式化后的时间
 */
function formatTime(date, format, timezone) {
    switch (format.toLowerCase()) {
        case 'timestamp':
            return date.getTime();

        case 'iso':
            return timezone === 'utc' ? 
                date.toISOString() : 
                date.toISOString().replace('Z', '');

        case 'date':
            return timezone === 'utc' ?
                date.toUTCString() :
                date.toString();

        case 'yyyymmddhhmmss':
            return formatCustomDate(date, timezone === 'utc');

        default:
            throw new Error(`不支持的输出格式: ${format}`);
    }
}

/**
 * 自定义日期格式化
 * @param {Date} date - Date对象
 * @param {boolean} isUTC - 是否使用UTC时间
 * @returns {string} 格式化后的时间字符串
 */
function formatCustomDate(date, isUTC) {
    const pad = (num) => String(num).padStart(2, '0');
    
    const year = isUTC ? date.getUTCFullYear() : date.getFullYear();
    const month = isUTC ? date.getUTCMonth() + 1 : date.getMonth() + 1;
    const day = isUTC ? date.getUTCDate() : date.getDate();
    const hours = isUTC ? date.getUTCHours() : date.getHours();
    const minutes = isUTC ? date.getUTCMinutes() : date.getMinutes();
    const seconds = isUTC ? date.getUTCSeconds() : date.getSeconds();

    return `${year}${pad(month)}${pad(day)}${pad(hours)}${pad(minutes)}${pad(seconds)}`;
}

// 使用示例
function examples() {
    // 示例1: 处理不同格式的输入
    console.log('\n示例1: 不同输入格式的处理');
    const inputs = [
        '2023-12-25',                    // 标准日期字符串
        '20231225',                      // 紧凑格式
        '20231225143000',                // YYYYMMDDHHmmss
        '2023/12/25 14:30:00',          // 带时间的日期
        new Date(),                      // Date对象
        1703491800000,                   // 时间戳
        '2023-12-25T14:30:00.000Z'      // ISO格式
    ];

    inputs.forEach(input => {
        try {
            const normalized = normalizeTime(input, { format: 'iso' });
            console.log(`输入: ${input}\n归一化后: ${normalized}\n`);
        } catch (error) {
            console.error(`处理 ${input} 时出错:`, error.message);
        }
    });

    // 示例2: 不同输出格式
    console.log('\n示例2: 不同输出格式');
    const date = new Date();
    const formats = ['timestamp', 'iso', 'date', 'yyyymmddhhmmss'];
    
    formats.forEach(format => {
        const result = normalizeTime(date, { format });
        console.log(`格式 ${format}: ${result}`);
    });

    // 示例3: 时区处理
    console.log('\n示例3: 时区处理');
    console.log('本地时间:', normalizeTime(date, { format: 'iso', timezone: 'local' }));
    console.log('UTC时间:', normalizeTime(date, { format: 'iso', timezone: 'utc' }));
}

// 运行示例
examples(); 
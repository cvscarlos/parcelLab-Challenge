import fs from 'fs';

export default class Data {
    constructor() {
        const checkpoints = this.csv2Json('./data/checkpoints.csv');
        // sorting the checkpoints
        checkpoints.sort((a, b) => {
            if (!(a.timestamp && a.timestamp)) {
                return 1;
            } else if (a.timestamp > b.timestamp) {
                return -1;
            } else if (a.timestamp < b.timestamp) {
                return 1;
            }
            return 0;
        });

        // Grouping checkpoints by track number
        const groupedCheckpoints = this.groupBy(checkpoints, 'tracking_number');

        // Getting orders and grouping by id
        this.ordersByNo = this.groupOrders(groupedCheckpoints);
        // Grouping orders by email
        this.ordersByEmail = this.groupBy(this.ordersByNo, 'email');
    }

    getOrdersByEmail(email) {
        return this.ordersByEmail[email] || [];
    }

    getOrderById(orderId) {
        return this.ordersByNo[orderId] || null;
    }

    groupBy(dataSource, key) {
        const output = {};
        for (const k in dataSource) {
            if (!Object.hasOwnProperty.call(dataSource, k)) {
                continue;
            }

            const item = dataSource[k];
            if (typeof item[key] != 'undefined') {
                output[item[key]] = output[item[key]] || [];
                output[item[key]].push(item);
            }
        }
        return output;
    }

    groupOrders(checkpoints) {
        const orders = this.csv2Json('./data/trackings.csv');
        const ordersByNo = {};

        for (const k in orders) {
            if (!Object.hasOwnProperty.call(orders, k)) {
                continue;
            }

            const order = orders[k];
            if (typeof order.orderNo != 'undefined') {
                const no = order.orderNo;

                if (ordersByNo[no]) {
                    // Adding new items to an existent order number
                    const item = this.generateOrderItem(order);
                    if (item) {
                        ordersByNo[no].items.push(item);
                    }
                } else {
                    // Creating an order index and generating the order.items
                    const item = this.generateOrderItem(order);
                    ordersByNo[no] = Object.assign({}, order, {
                        items: item ? [item] : [],
                    });

                    // Adding the last track information
                    if (order.tracking_number) {
                        ordersByNo[no].tracking = checkpoints[order.tracking_number]?.[0] || [{}];
                    } else {
                        ordersByNo[no].tracking = {};
                    }
                }
            }
        }

        return ordersByNo;
    }

    generateOrderItem(order) {
        if (!order.quantity) {
            return null;
        }

        return {
            articleNo: order.articleNo || null,
            articleImageUrl: order.articleImageUrl || null,
            quantity: order.quantity || null,
            product_name: order.product_name || null,
        };
    }

    csv2Json(filepath) {
        /*
        Here I could use one exist .csv parser
        but I decide to do it by myself only to show one alternative to how deal with different files formats.
        It is not considering big files
        */
        const fileContent = fs.readFileSync(filepath, 'utf-8');
        const lines = fileContent.split('\n');
        const titles = lines.shift().split(';');

        const output = [];
        lines.forEach((line) => {
            line = line.trim();
            if (!line.length) {
                return;
            }

            const cells = line.split(';');

            const jsonLine = {};
            titles.forEach((title, index) => {
                if (cells[index]) {
                    jsonLine[title] = cells[index];
                    if (jsonLine[title].timestamp) {
                        jsonLine[title].timestamp = new Date(timestamp);
                    }
                } else {
                    jsonLine[title] = null;
                }
            });

            output.push(jsonLine);
        });

        return output;
    }
}

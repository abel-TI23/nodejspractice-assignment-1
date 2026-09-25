const os = require('os');
const readline = require('readline');

const cyan=(text) =>  `\x1b[36m${text}\x1b[0m`;
const green=(text) =>  `\x1b[32m${text}\x1b[0m`;
const yellow=(text) =>  `\x1b[33m${text}\x1b[0m`;
const bold=(text) =>  `\x1b[1m${text}\x1b[0m`;

const tasks = [
    { id : 1, task: "Belajar Dasar node.js", status:"Selesai" },
    { id : 2, task: "Setup package.json", status:"Selesai" },
    { id : 3, task: "Explorasi fitur CLI interaktif", status:"Dalam Proses" }
];

function getProgressBar(percent) {
    const totalBars = 20;
    const filledBars = Math.round((percent/100) * totalBars);
    const emptyBars =totalBars - filledBars ;
    return `[${'#'.repeat(filledBars)}${'-'.repeat(emptyBars)}] ${percent.toFixed(1)}%`;
}

function showDashboard() {
    console.clear();
    const totalMem = (os.totalmem() / (1024 ** 3)).toFixed(2);
    const freeMem = (os.freemem() / (1024 ** 3)).toFixed(2);
    const usedMem = (totalMem - freeMem).toFixed(2);
    const memPercent = ((totalMem - freeMem) / totalMem) * 100;
    const uptimeMin = (os.uptime() / 60).toFixed(0);

    console.log(bold(cyan("================================")));
    console.log(bold(cyan("Dashboard Node.Js & Task Manager")));
    console.log(bold(cyan("================================")));
    console.log(`User   : ${green(os.userInfo().username)}`);
    console.log(`OS     : ${os.type()} (${os.arch()})`);
    console.log(`CPU    : ${os.cpus()[0].model.trim()}`);
    console.log(`Uptime : ${uptimeMin} Menit`);
    console.log(`RAM    : ${usedMem} GB / ${totalMem} GB`);
    console.log(`           ${yellow(getProgressBar(memPercent))}`);
    console.log(bold(cyan("________________________________")));

    console.log(bold("\n LIST TASK SAAT INI"));
    console.table(tasks);
    console.log(bold(cyan("--------------------------------")));
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askComand(){
    console.log(`\n${bold('Pilihan Menu')}`);
    console.log(`[1] Tambah Task Baru`);
    console.log(`[2] Refresh Dashboard`);
    console.log(`[3] Keluar`);


    rl.question('\nPilih menu (1/2/3): ', (answer) => {
        const choice = answer.trim();
        if (choice === '1') {
            rl.question('\nMasukan nama task baru: ', (newTaskName) => {
                if (newTaskName.trim()) {
                    tasks.push({
                        id: tasks.length + 1,
                        task: newTaskName.trim(),
                        status: "Dalam Proses"
                    });
                    console.log(green('\nTask Berhasil ditambahkan!'));
                }
                setTimeout(() => {
                    showDashboard();
                    askComand();
                }, 1000);
            });
        } else if (choice === '2') {
            showDashboard();
            askComand();
        } else if (choice === '3') {
            console.log(green('\nKeluar dari program. Sampai jumpa!'));
            rl.close();
            process.exit(0);
        } else {
            console.log(yellow('\nPilihan gak valid, coba lagi ya.'));
            setTimeout(() => {
                showDashboard();
                askComand();
            }, 1000);
        }
    });
}

showDashboard();
askComand();


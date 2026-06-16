const { updateArticle } = require('./update-articles.js');

const article1Body = `
Ngay 28/05/2026, Anthropic phat hanh Claude Opus 4.8 — va no da lat nguoc ban do. Theo Artificial Analysis Intelligence Index, Opus 4.8 dat diem 61.4, vuot qua GPT-5.5 voi 60.2. Day la lan dau tien tu thang 4/2026 mot model Claude vuot qua GPT tren benchmark tong hop.

Nhung con so nang khong ke het cau chuyen. Phan thuc su hap dan la cach hai hang dang thay doi cach canh tranh — khong nua la "ai manh hon" ma la "ai hieu qua hon, an toan hon, va re hon" cho tung loai cong viec cu the.

## SWE-bench: Cuoc dau coding quyet dinh tat ca

Neu ban chi co the mot benchmark de danh gia AI coding, do la **SWE-bench** — benchmark danh gia kha nang giai quyet van de thuc te tu GitHub issues.

Theo so lieu tu Vals AI (independent benchmark):

- **Claude Fable 5**: 95.0% SWE-bench Verified — nhung da bi suspend
- **Claude Opus 4.8**: 88.6% SWE-bench Verified, **69.2% SWE-bench Pro**
- **GPT-5.5**: 82.6% SWE-bench Verified
- **Claude Opus 4.7**: 82.0% SWE-bench Verified
- **Gemini 3.5 Flash**: 78.8% SWE-bench Verified

Tren SWE-bench Pro — benchmark phuc tap hon, yeu cau model phai hieu cau truc code sau hon — Opus 4.8 dat **69.2%**, vuot xa GPT-5.5 khoang 10 diem. Day khong phai la sai so nho. Trong the gioi AI coding, 10 diem SWE-bench Pro tuong duong voi viec giai duoc 10 van de phuc tap nhieu hon moi lan thu.

**Nghia la gi?** Neu ban la developer dang su dung AI de viet code, Opus 4.8 se giai quyet nhieu hon, nhanh hon, va it sai hon cho cung mot van de.

## Terminal-Bench: Noi GPT-5.5 chien thang

Tuy nhien, GPT-5.5 khong hoan toan thua. Tren **Terminal-Bench 2.1** — benchmark danh gia kha nang su dung terminal va cong cu lenh — GPT-5.5 dat **78.2%**, vuot qua Opus 4.8.

Dieu nay co y nghia thuc te: neu ban can AI thuc thi cac tac vu he thong (install package, cau hinh server, debug qua terminal), GPT-5.5 la lua chon tot hon.

Theo analysis tu WindowsForum: "GPT-5.5 can solve more tasks while using fewer tokens and fewer reasoning steps than Claude Opus 4.8. The operational implication is straightforward: the OpenAI model is doing more with less."

## Pricing: Ai re hon?

Day la noi nhieu nguoi thieu hieu ro:

| Model | Input | Output | Context Window |
|-------|-------|--------|----------------|
| Claude Opus 4.8 | $5/MTok | $25/MTok | 1M tokens |
| GPT-5.5 | $2.5/MTok | $10/MTok | 2M tokens |
| GPT-5.5 Pro | $10/MTok | $40/MTok | 2M tokens |

GPT-5.5 re hon **50%** so voi Opus 4.8. Neu ban can chi phi thap va context window lon (2M tokens), GPT-5.5 la lua chon kinh te hon.

Tuy nhien, co mot **pricing trap** ma nhieu nguoi khong de y: tren 272K tokens, GPT-5.5 ap dung surcharge. Neu ban thuong xu ly van ban dai (sach, bao cao nghien cuu), chi phi co the tang dot ngot.

## Computer Use: Opus 4.8 dan dau

Mot khia canh quan trong khac la **computer use** — kha nang AI dieu khien may tinh thuc su. Opus 4.8 co kha nang mo browser, click, type, va thuc hien nhiem vu tren desktop.

Tren benchmark **OSWorld-Verified** danh gia computer use, Opus 4.8 vuot xa GPT-5.5. Day la tinh nang quan trong cho **agentic workflows** — khi ban muon AI tu dong thuc hien chuoi tac vu phuc tap.

## Fable 5 va Mythos 5: Bi suspend vi qua manh

Truoc khiOpus 4.8 ra mat, Anthropic da phat hanh **Claude Fable 5** va **Claude Mythos 5** — hai model manh nhat cua ho:

- **Fable 5**: 95% SWE-bench Verified — so lieu cao nhat lich su
- **Mythos 5**: Model dac biet, chi danh cho co quan chinh phu, co kha nang phat hien lo hong bao mat

Tuy nhien, chinh phu My da orders Anthropic **suspend access cho tat ca nuoc ngoai** vi lo ngai jailbreak vulnerability. Anthropic phan hoi rang ho nhan duoc cuoc goi tu chinh phu luc 1:00 CH CHIEU NGAY THU SAU, yeu cau suspend ngay lap tuc.

Day la lan thu hai trong vai thang Anthropic bi chinh phu My "can thiep" vao model cua ho. Truoc do, Mythos 5 chi duoc phat hanh cho mot nhom han che cac co quan chinh phu qua **Project Glasswing**.

> Vu Mythos 5/Fable 5 cho thay: AI manh cung nguy hiem hon. Va chinh phu khong se chan de kiem soat.

## Anthropic vs OpenAI: Chien luoc khac nhau

### Anthropic: "AI an toan truoc"

Anthropic dang dat cuoc vao **an toan**. Constitutional AI, RLHF nang cao, va han che chat che la lo trinh cua ho. Opus 4.8 it hallucination hon, trung thuc hon, va co the tu choi cac yeu cau co hai.

Nhu mot developer chia se tren Reddit: "Opus 4.8 is more consistently complete and instruction-aware."

### OpenAI: "AI manh nhat, re nhat"

OpenAI dang dat cuoc vao **hieu suat va gia**. GPT-5.5 re hon 50%, context window lon hon (2M tokens), va hieu qua hon tren terminal tasks.

### Google: "AI da phuong thuc"

Google Gemini 3.5 Flash dat 78.8% SWE-bench Verified — gan bang Opus 4.7 — nhung voi gia re hon nhieu. Google dang tap trung vao **multimodal** (van ban + hinh anh + video + am thanh).

## Phan tich cho developer Viet Nam

Neu ban la developer Viet Nam, day la practical advice:

### Chon GPT-5.5 neu:
- Ban can **gia re** ($2.5/$10)
- Ban can **context window lon** (2M tokens)
- Ban lam nhieu **terminal/system tasks**
- Ban can AI **nhanh**, it "nghi"

### Chon Claude Opus 4.8 neu:
- Ban can **coding tot hon** (SWE-bench 69.2% vs ~59%)
- Ban can **agentic workflows** (computer use)
- Ban can AI **an toan, it hallucination**
- Ban lam **project phuc tap**, can AI "suy luan sau"

### Chon ca hai:
Strategy tot nhat la **model routing** — su dung GPT-5.5 cho terminal tasks va Opus 4.8 cho coding tasks. Day la cach nhieu team dang lam trong production.

## Giai doan hien tai: AI da den dau?

Tinh den thang 6/2026:

1. **Opus 4.8** dang dan dau tren benchmark tong hop (61.4 vs 60.2)
2. **GPT-5.5** re hon va co context window lon hon
3. **Fable 5** bi suspend — AI qua manh cung la van de
4. **Gemini** dang tro thanh alternative tot cho budget-conscious teams
5. **Llama 4** (mo nguon) dang gap khoang cach voi proprietary models

Cuoc dua AI khong con la "ai manh nhat". No da tro thanh "ai phu hop nhat cho cong viec cu the cua ban". Va day la thay doi lon nhat trong cach chung ta su dung AI.

*TechPulse — Phan tich AI chuyen sau, dua tren data that.*
`;

async function main() {
  console.log('Rewriting Article 1 with real data...');
  await updateArticle('article-1', article1Body, 
    'Claude Opus 4.8 vuot GPT-5.5 tren Artificial Analysis Intelligence Index (61.4 vs 60.2). Phan tich chi tiet SWE-bench, pricing, computer use, va practical advice cho developer.',
    12
  );
  console.log('Done!');
}

main().catch(console.error);

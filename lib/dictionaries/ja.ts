import type { Dictionary } from "../i18n";

const ja: Dictionary = {
  brand: "FocusDash",
  tagline: "すべての計時はブラウザの中で。",
  metaDesc: "無料のオンラインタイマー:ポモドーロ、フロータイム、ラップ付きストップウォッチ、複数の名前付きカウントダウン。すべてブラウザ内で完結し、計った秒は端末から出ません。",

  nav: {
    tools: "すべてのツール",
    categories: "カテゴリー",
    about: "このサイトについて",
    menu: "メニュー",
    language: "言語",
  },

  home: {
    heroTitle: "集中を尊重するタイマー。注意力は削らない",
    heroSub: "FocusDash は集中タイマー集:ポモドーロのサイクル、フロータイム、ラップ付きストップウォッチ、並行カウントダウン。すべてブラウザ内で——高速・無料・登録不要・送信ゼロ。",
    browseAll: "すべてのツールを見る",
    pinned: "ピン留め",
    pin: "トップに固定",
    unpin: "固定を解除",
    popular: "人気のツール",
    categoriesTitle: "カテゴリー",
    featuredTitle: "人気のツール",
    trustLocal: "計測はあなたのデバイスの中だけ",
    trustFree: "無料・アカウント不要",
    trustFast: "即時処理・オフライン対応",
    rotating: [
      "25/5 のポモドーロを 1 セット——4 回の集中と長い休憩、切替音つき",
      "フロータイム:区切りまで集中して、5 分につき 1 分の休憩を提案",
      "長いランをラップに分割——100 分の一秒精度で",
      "お茶 3:00、コードレビュー 15:00——カウントダウンを並べて同時に",
    ],
    statsLabels: { tools: "ツール", languages: "言語", uploads: "アップロード", accounts: "アカウント" },
    eyebrow: "ずっと無料",
    heroCtaSecondary: "仕組みを見る",
    statsTools: "{n} 個のツール",
    statsLanguages: "{n} 言語",
    statsUploads: "アップロード 0 回",
    statsAccounts: "アカウント 0 個",
    categoriesSub: "4 つのタイマー、すべてあなたのデバイスで動きます。",
    popularSub: "いちばん使われているツール。",
    privacyTitle: "計った秒は、あなたのデバイスから出ません。",
    privacySub: "アップロードという工程が存在しません。ツールはブラウザ内で動く JavaScript そのものです。ポリシーではなく構造の話です。",
    privacyPoint1T: "ローカル処理",
    privacyPoint1D: "計時はページの動作中、あなたのデバイスの時計からメモリ内で計算されます。どこにも送信されません。",
    privacyPoint2T: "アカウント不要",
    privacyPoint2D: "登録もメールも履歴もありません。開いてすぐ使えます。",
    privacyPoint3T: "誠実な設計",
    privacyPoint3D: "ブラウザでできないことは、できないとはっきり書きます。",
    privacyLink: "プライバシーの詳細を読む",
    endTitle: "ツールを選んで、すぐ使える。",
    endSub: "15 言語、送信ゼロ、インストール不要。",
  },

  tools: {
    title: "すべてのツール",
    subtitle: "{count} 個の無料ブラウザツールを検索。アップロード不要・登録不要。",
    filterPlaceholder: "ツールを検索…",
    count: "{count} 個のツール",
    empty: "「{query}」に一致するツールはありません。",
  },

  categories: {
    pdf: { name: "PDF", desc: "PDF の結合・分割・変換・編集をどこにもアップロードせずに行えます。" },
    image: { name: "画像", desc: "画像の圧縮・リサイズ・切り抜き・形式変換をブラウザ内で。" },
    text: { name: "テキスト", desc: "文字数・整形・並べ替え・変換を入力しながら即時に。" },
    developer: { name: "開発者", desc: "日々の開発に使うフォーマッタ・エンコーダ・ジェネレータ。" },
    seo: { name: "SEO", desc: "メタタグ・構造化データ・SERP プレビューなどの SEO ヘルパー。" },
    security: { name: "セキュリティ", desc: "パスワード・ハッシュ・各種ルックアップを端末内で生成・検証。" },
    utility: { name: "タイマー", desc: "ポモドーロ、フロータイム、ストップウォッチ、複数カウントダウン。集中作業と日常の締め切りのための計時ツール。" },
  },

  tool: {
    howTo: "使い方",
    faq: "よくある質問",
    related: "関連ツール",
    nextStep: "次のステップ",
    copyLink: "リンクをコピー",
    privacyNote:
      "このツールは完全にブラウザ内で動作します。データは端末から出ず、サーバーへアップロードされることはありません。",
    inCategory: "{category}のその他のツール",
    backToCategory: "{category}のすべてのツール",
  },

  common: {
    openTool: "ツールを開く",
    copy: "コピー",
    copied: "コピーしました",
    download: "ダウンロード",
    reset: "リセット",
    swap: "入れ替え",
    clear: "クリア",
    error: "エラーが発生しました。入力を確認して再試行してください。",
    input: "入力",
    output: "結果",
    settings: "オプション",
    dropFiles: "ここにファイルをドロップ、またはクリックして選択",
    dropFile: "ここにファイルをドロップ、またはクリックして選択",
    processing: "処理中…",
    fileSize: "サイズ",
    sample: "サンプルを試す",
    uppercase: "大文字",
  },

  unit: {
    from: "変換前",
    to: "変換後",
    amount: "数値",
    result: "結果",
    common: "よく使う変換",
    formula: "計算式",
    allUnits: "すべての単位",
  },

  text: {
    stats: {
      words: "単語数",
      characters: "文字数",
      charsNoSpaces: "空白除く",
      sentences: "文の数",
      paragraphs: "段落",
      lines: "行数",
      readingTime: "読了時間",
      readingMinutes: "約 {n} 分",
    },
  },

  footer: {
    line: "集中と計時のツール。ここで計ったものはデバイスの外に出ません。",
    privacy: "プライバシー",
    terms: "利用規約",
    about: "このサイトについて",
    badges: "バッジ",
    language: "言語",
  },

  badge: {
    title: "FocusDash バッジ",
    desc: "FocusDash バッジをサイトや README、ドキュメントに。リンクで本サイトに戻り、背後のタイマーがすべてブラウザ内で動くことを伝えられます。",
    voluntary: "設置は完全に任意です。プロジェクトを気に入ったらお好きなバッジをどうぞ。許可は不要です。",
    md: "Markdown(README)",
    html: "HTML(ウェブサイト)",
    thanks: "広めていただきありがとうございます。すべての設置が、ファイルを尊重するツールの発見につながります。",
  },

    embed: {
    title: "ツールを埋め込む",
    desc: "1 行であなたのサイトにツールを。訪問者のブラウザ内で動きます。",
  },

    mcp: {
    title: "MCP サーバー——AI から呼び出せるツール",
    desc1: "FocusDash は MCP(Model Context Protocol)サーバーを同梱しています。Claude や Cursor などの AI アシスタントが、このサイトと同じ計時ロジックをそのまま実行できます——同じテスト済み関数です。",
    desc2: "ツールはサイト本体の純関数(ポモドーロのフェーズスケジュールと時間の整形)を動かします。実行は npx 経由で AI クライアント側のマシン上で行われ、当社サーバーには何も送られません。",
    toolsTitle: "実行可能なツール({n} 個)",
    requiresNode: "Node.js 18+ が必要です。サーバーは stdio でローカル実行。呼び出したツール計算のみローカルで行われます。",
    privacy: "Node.js 18+ が必要です。サーバーは stdio でローカル実行。呼び出したツール計算のみローカルで行われます。",
  },

    notFound: {
    title: "ページが見つかりません",
    body: "お探しのツールは存在しません。すべてのツールからお探しください。",
    home: "ホームへ戻る",
  },
};

export default ja;

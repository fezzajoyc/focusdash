// vi — từ điển tiếng Việt. Hình dạng khóa phải khớp en chính xác (tests/seo.test.ts).
// Giữ nguyên "FocusDash", các placeholder {n}/{count}/{query}/{category} và token kỹ thuật.
const vi = {
  brand: "FocusDash",
  tagline: "Mọi phép đo thời gian chạy ngay trong trình duyệt.",
  metaDesc: "Bộ đếm giờ trực tuyến miễn phí: Pomodoro, Flowtime, đồng hồ bấm giây có laps và nhiều bộ đếm ngược có tên. Tất cả chạy trong trình duyệt — từng giây ở lại trên thiết bị của bạn.",

  nav: {
    tools: "Tất cả công cụ",
    categories: "Danh mục",
    about: "Giới thiệu",
    menu: "Menu",
    language: "Ngôn ngữ",
  },

  home: {
    heroTitle: "Bộ đếm giờ tôn trọng sự tập trung của bạn, không phải khoảng chú ý của bạn",
    heroSub: "FocusDash là bộ công cụ đếm giờ tập trung: chu kỳ Pomodoro, Flowtime, đồng hồ bấm giây có laps và bộ đếm ngược song song. Tất cả trong trình duyệt — nhanh, miễn phí, không cần đăng ký, không gửi đi đâu.",
    browseAll: "Xem tất cả công cụ",
    categoriesTitle: "Danh mục",
    featuredTitle: "Công cụ phổ biến",
    trustLocal: "Phiên làm việc của bạn ở lại trên thiết bị",
    trustFree: "Miễn phí, không cần tài khoản",
    trustFast: "Tức thì, dùng được cả khi offline",
    rotating: [
      "Trọn một set Pomodoro 25/5 có chuông — bốn khối tập trung, một giờ nghỉ dài",
      "Flowtime: làm việc đến điểm dừng tự nhiên, nghỉ một phút cho mỗi năm phút tập trung",
      "Chia một đường chạy dài thành các laps chính xác đến phần trăm giây",
      "Trà 3:00, review code 15:00 — đếm ngược song song cạnh nhau",
    ],
    statsLabels: { tools: "công cụ", languages: "ngôn ngữ", uploads: "lượt tải lên", accounts: "tài khoản" },
    eyebrow: "Miễn phí mãi mãi",
    heroCtaSecondary: "Cách hoạt động",
    statsTools: "{n} công cụ",
    statsLanguages: "{n} ngôn ngữ",
    statsUploads: "0 lượt tải lên",
    statsAccounts: "0 tài khoản",
    categoriesSub: "Bốn bộ đếm giờ, tất cả chạy trên thiết bị của bạn.",
    popularSub: "Những công cụ được mở nhiều nhất.",
    privacyTitle: "Từng giây không bao giờ rời thiết bị của bạn.",
    privacySub:
      "Không có bước tải lên. Các công cụ là JavaScript chạy trong trình duyệt của bạn — đó không phải lời hứa về chính sách, mà là cách chúng được xây dựng.",
    privacyPoint1T: "Xử lý cục bộ",
    privacyPoint1D: "Phép đo được tính trong bộ nhớ bằng đồng hồ của chính thiết bị bạn trong khi trang chạy. Không có gì được truyền đi, đến bất cứ đâu.",
    privacyPoint2T: "Không cần tài khoản",
    privacyPoint2D: "Không đăng ký, không email, không lưu lịch sử. Mở công cụ lên và dùng ngay.",
    privacyPoint3T: "Trung thực từ thiết kế",
    privacyPoint3D:
      "Nếu có gì đó thực sự không thể làm trong trình duyệt, chúng tôi nói thẳng thay vì giả vờ được.",
    privacyLink: "Đọc ghi chú riêng tư đầy đủ",
    endTitle: "Chọn một công cụ. Nó chỉ đơn giản là hoạt động.",
    endSub: "Mười lăm ngôn ngữ, không tải lên, không cần cài đặt.",
  },

  tools: {
    title: "Tất cả công cụ",
    subtitle: "Tìm kiếm trong {count} công cụ trình duyệt miễn phí. Không tải lên, không đăng ký.",
    filterPlaceholder: "Tìm công cụ…",
    count: "{count} công cụ",
    empty: "Không có công cụ nào khớp với “{query}”.",
  },

  categories: {
    pdf: { name: "PDF", desc: "Gộp, tách, chuyển đổi và chỉnh sửa file PDF mà không cần tải lên bất cứ đâu." },
    image: { name: "Ảnh", desc: "Nén, đổi kích thước, cắt và chuyển đổi ảnh ngay trong trình duyệt của bạn." },
    text: { name: "Văn bản", desc: "Đếm, làm sạch, sắp xếp và biến đổi văn bản tức thì khi bạn gõ." },
    developer: { name: "Lập trình viên", desc: "Trình định dạng, bộ mã hóa, bộ giải mã và trình tạo cho công việc dev hằng ngày." },
    seo: { name: "SEO", desc: "Thẻ meta, dữ liệu có cấu trúc, xem trước SERP và các trợ thủ SEO trên trang." },
    security: { name: "Bảo mật", desc: "Mật khẩu, hàm băm và tra cứu — tạo và kiểm tra ngay trên thiết bị của bạn." },
    utility: { name: "Bộ đếm giờ", desc: "Pomodoro, Flowtime, đồng hồ bấm giây và bộ đếm ngược nhiều luồng cho công việc tập trung và hạn chót hằng ngày." },
  },

  tool: {
    howTo: "Cách sử dụng",
    faq: "Câu hỏi thường gặp",
    related: "Công cụ liên quan",
    privacyNote:
      "Công cụ này chạy hoàn toàn trong trình duyệt của bạn. Dữ liệu không bao giờ rời khỏi thiết bị — không được tải lên bất kỳ máy chủ nào.",
    inCategory: "Xem thêm trong {category}",
    backToCategory: "Tất cả công cụ {category}",
  },

  common: {
    copy: "Sao chép",
    copied: "Đã sao chép",
    download: "Tải xuống",
    reset: "Đặt lại",
    swap: "Đảo chiều",
    clear: "Xóa",
    error: "Đã xảy ra lỗi. Kiểm tra dữ liệu nhập và thử lại.",
    input: "Đầu vào",
    output: "Kết quả",
    settings: "Tùy chọn",
    dropFiles: "Kéo thả file vào đây hoặc bấm để chọn",
    dropFile: "Kéo thả file vào đây hoặc bấm để chọn",
    processing: "Đang xử lý…",
    fileSize: "Dung lượng",
    sample: "Dùng thử ví dụ",
    uppercase: "CHỮ IN HOA",
  },

  unit: {
    from: "Từ",
    to: "Sang",
    amount: "Số lượng",
    result: "Kết quả",
    common: "Chuyển đổi thường dùng",
    formula: "Công thức",
    allUnits: "Tất cả đơn vị",
  },

  text: {
    stats: {
      words: "Từ",
      characters: "Ký tự",
      charsNoSpaces: "Không khoảng trắng",
      sentences: "Câu",
      paragraphs: "Đoạn",
      lines: "Dòng",
      readingTime: "Thời gian đọc",
      readingMinutes: "{n} phút đọc",
    },
  },

  footer: {
    line: "Công cụ tập trung và đo thời gian. Bất cứ thứ gì bạn đo ở đây đều không rời thiết bị của bạn.",
    privacy: "Quyền riêng tư",
    terms: "Điều khoản",
    about: "Giới thiệu",
    badges: "Huy hiệu",
    language: "Ngôn ngữ",
  },

  badge: {
    title: "Huy hiệu FocusDash",
    desc: "Gắn huy hiệu FocusDash lên trang web, README hay tài liệu của bạn. Nó dẫn về đây và cho mọi người biết các bộ đếm giờ phía sau chạy hoàn toàn trong trình duyệt.",
    voluntary: "Việc nhúng hoàn toàn tự nguyện — chọn một huy hiệu nếu bạn thích dự án này. Không cần xin phép ai.",
    md: "Markdown (README)",
    html: "HTML (trang web)",
    thanks: "Cảm ơn bạn đã lan tỏa — mỗi lượt nhúng giúp nhiều người hơn khám phá những công cụ tôn trọng file của họ.",
  },

  embed: {
    title: "Nhúng công cụ này",
    desc: "Đưa công cụ này vào trang của bạn bằng một dòng — nó chạy trong trình duyệt của khách.",
  },

    mcp: {
    title: "Máy chủ MCP — công cụ cho AI gọi trực tiếp",
    desc1: "FocusDash đi kèm máy chủ MCP (Model Context Protocol): các trợ lý AI như Claude hay Cursor có thể chạy chính logic bộ đếm giờ trên site này — cùng các hàm đã kiểm thử, không viết lại.",
    desc2: "Các công cụ chạy hàm thuần của chính site: lịch pha Pomodoro và định dạng khoảng thời gian. Việc thực thi diễn ra trên máy của AI client qua npx — không có gì được gửi đến máy chủ của chúng tôi.",
    toolsTitle: "Công cụ chạy được ({n})",
    requiresNode: "Cần Node.js 18+. Máy chủ chạy cục bộ qua stdio; chỉ các lệnh bạn gọi được tính trên máy của bạn.",
    privacy: "Cần Node.js 18+. Máy chủ chạy cục bộ qua stdio; chỉ các lệnh bạn gọi được tính trên máy của bạn.",
  },

    notFound: {
    title: "Không tìm thấy trang",
    body: "Công cụ bạn tìm không tồn tại. Hãy xem tất cả công cụ thay thế.",
    home: "Về trang chủ",
  },
};

export default vi;

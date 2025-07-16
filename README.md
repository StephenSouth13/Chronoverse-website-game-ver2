# 🌌 ChronoVerse Website - Khám Phá Vũ Trụ Vô Tận 🚀

Chào mừng bạn đến với mã nguồn của website chính thức cho **ChronoVerse** – một tựa game 3D giáo dục nhập vai đưa bạn vào hành trình khám phá những bí ẩn sâu th thẳm của vũ trụ! Dự án này được xây dựng với các công nghệ web hiện đại nhất để mang lại trải nghiệm mượt mà, tương tác và đầy cảm hứng.

## ✨ Tính Năng Nổi Bật

*   **Giao Diện Vũ Trụ Độc Đáo:** Thiết kế lấy cảm hứng từ không gian với hiệu ứng glassmorphism, màu sắc rực rỡ và typography hiện đại.
*   **Hiệu Ứng Nền Động:**
    *   **Hạt Vũ Trụ (Particle Background):** Hiệu ứng hạt nền sống động, tạo cảm giác như đang trôi nổi trong không gian.
    *   **Sao Băng (Shooting Stars):** Các vệt sao băng lướt qua màn hình, tăng thêm vẻ huyền ảo cho vũ trụ.
    *   **Parallax Scrolling:** Hiệu ứng cuộn đa lớp trên trang chủ, tạo chiều sâu và cảm giác chuyển động trong không gian.
*   **Con Trỏ Tùy Chỉnh:** Con trỏ chuột hình phi thuyền độc đáo, có thể chuyển đổi về mặc định bằng cách nhấp đúp chuột phải.
*   **Hệ Thống Đăng Nhập/Đăng Ký:** Giao diện đăng nhập/đăng ký theo chủ đề không gian, tích hợp Server Actions để xử lý xác thực.
*   **Hệ Thống Bình Luận:** Cho phép người dùng đã đăng nhập bình luận trên các bài viết tin tức, với khả năng tải và hiển thị bình luận động.
*   **ChronoBot AI Chatbot:** Một chatbot thông minh được hỗ trợ bởi AI, cung cấp thông tin chi tiết về game dựa trên ngữ cảnh trang hiện tại và dữ liệu game.
*   **Hỗ Trợ Đa Ngôn Ngữ (Tiếng Việt & Tiếng Anh):** Toàn bộ nội dung và giao diện đều có thể chuyển đổi giữa tiếng Việt và tiếng Anh một cách mượt mà.
*   **Chế Độ Sáng/Tối:** Chuyển đổi linh hoạt giữa chế độ sáng và tối để phù hợp với sở thích người dùng.
*   **Lịch Sử Phát Triển Game (Timeline):** Một phần timeline trực quan trên trang "Giới Thiệu Game" kể lại hành trình phát triển ChronoVerse từ ý tưởng đến hiện thực.
*   **Trailer Game Hấp Dẫn:** Phần trailer game nổi bật trên trang chủ, giúp người dùng có cái nhìn trực quan và sống động về thế giới ChronoVerse.
*   **Tối Ưu Hóa Hiệu Suất:** Các chiến lược tối ưu hóa cho game WebGL và tài nguyên trang web để đảm bảo trải nghiệm tải nhanh và mượt mà.
*   **Thiết Kế Đáp Ứng:** Giao diện được tối ưu hóa cho mọi kích thước màn hình, từ di động đến máy tính để bàn.

## 🛠️ Công Nghệ Sử Dụng

*   **Next.js 15 (App Router):** Framework React mạnh mẽ cho các ứng dụng web hiệu suất cao.
*   **React 19 (RC):** Thư viện JavaScript để xây dựng giao diện người dùng.
*   **Tailwind CSS:** Framework CSS tiện ích để tạo kiểu nhanh chóng và linh hoạt.
*   **shadcn/ui:** Các thành phần UI có thể tùy chỉnh, được xây dựng trên Tailwind CSS và Radix UI.
*   **Framer Motion:** Thư viện hoạt ảnh mạnh mẽ cho React, được sử dụng cho các hiệu ứng cuộn và chuyển động.
*   **react-tsparticles:** Thư viện để tạo các hiệu ứng hạt và sao băng tùy chỉnh.
*   **AI SDK (`@ai-sdk/openai`):** Để tích hợp mô hình AI cho ChronoBot.
*   **TypeScript:** Ngôn ngữ lập trình tăng cường độ tin cậy và khả năng bảo trì mã.
*   **Lucide React:** Thư viện icon đẹp mắt và dễ sử dụng.

## 🚀 Cài Đặt & Chạy Dự Án

Để chạy dự án này trên máy cục bộ của bạn, hãy làm theo các bước sau:

1.  **Clone repository:**
    \`\`\`bash
    git clone https://github.com/your-username/chronoverse-website.git
    cd chronoverse-website
    \`\`\`

2.  **Cài đặt các dependencies:**
    \`\`\`bash
    npm install
    # hoặc
    yarn install
    # hoặc
    pnpm install
    \`\`\`

3.  **Cài đặt shadcn/ui components:**
    Dự án này sử dụng các thành phần từ `shadcn/ui`. Nếu bạn muốn thêm các thành phần khác hoặc cập nhật, hãy chạy lệnh sau:
    \`\`\`bash
    npx shadcn@latest add <component-name>
    \`\`\`
    Ví dụ: `npx shadcn@latest add button`

4.  **Thiết lập biến môi trường:**
    Tạo một tệp `.env.local` trong thư mục gốc của dự án và thêm biến môi trường cho AI Chatbot:
    \`\`\`
    OPENAI_API_KEY=your_openai_api_key_here
    \`\`\`
    (Thay `your_openai_api_key_here` bằng khóa API OpenAI của bạn.)

5.  **Chạy ứng dụng:**
    \`\`\`bash
    npm run dev
    # hoặc
    yarn dev
    # hoặc
    pnpm dev
    \`\`\`
    Ứng dụng sẽ chạy trên `http://localhost:3000`.

## 🤖 Cách Sử Dụng ChronoBot

ChronoBot là trợ lý AI của bạn trên trang web ChronoVerse.
*   Nhấp vào biểu tượng chatbot ở góc dưới bên phải màn hình để mở/đóng.
*   Nhập câu hỏi của bạn vào ô nhập liệu và nhấn Enter hoặc nút gửi.
*   ChronoBot sẽ cung cấp thông tin liên quan đến game, đặc biệt là dựa trên trang bạn đang truy cập (ví dụ: nếu bạn đang ở trang "Giới Thiệu Game", nó sẽ tập trung vào cốt truyện, gameplay, v.v.).

## 🛸 Cách Sử Dụng Con Trỏ Tùy Chỉnh

*   **Kích hoạt/Vô hiệu hóa:** Con trỏ phi thuyền được kích hoạt mặc định. Để chuyển đổi giữa con trỏ phi thuyền và con trỏ mặc định của hệ thống, hãy **nhấp đúp chuột phải** vào bất kỳ đâu trên trang.
*   **Thông báo:** Một thông báo toast sẽ xuất hiện để xác nhận trạng thái con trỏ hiện tại.

## 📝 Quản Lý Nội Dung

*   **Tin tức & FAQ:** Dữ liệu cho các bài viết tin tức (`mockNews`), câu hỏi thường gặp (`mockFAQs`), tính năng chính (`mockKeyFeatures`), và các chương game (`mockChapters`) được quản lý trong tệp `lib/data.ts`. Bạn có thể chỉnh sửa tệp này để cập nhật nội dung.
*   **Lịch sử phát triển:** Dữ liệu cho lịch sử phát triển (`mockDevelopmentHistory`) cũng được quản lý trong `lib/data.ts`.
*   **Bình luận:** Hệ thống bình luận hiện tại là giả lập và được quản lý trong `actions/comments.ts`. Trong một ứng dụng thực tế, bạn sẽ tích hợp với một cơ sở dữ liệu backend.

## 🌐 Triển Khai

Dự án này được tối ưu hóa để triển khai trên [Vercel](https://vercel.com), nền tảng được khuyến nghị cho các ứng dụng Next.js. Chỉ cần kết nối repository GitHub của bạn với Vercel, và nó sẽ tự động triển khai.

## 📄 Giấy Phép

Mọi quyền đối với phần mềm này đều được bảo lưu bởi Quách Thành Long. Không được phép sao chép, phân phối, hoặc sử dụng bất kỳ phần nào của phần mềm mà không có sự cho phép bằng văn bản từ tác giả. Vui lòng xem tệp [LICENSE](#license) để biết thêm chi tiết.

## ℹ️ Thông tin và các điều khoản cho người dùng của ChronoVerse

### 1. Quyền truy cập và Sử dụng Game
*   **Truy cập:** Website ChronoVerse cung cấp quyền truy cập miễn phí vào game thông qua trình duyệt web (WebGL).
*   **Mục đích sử dụng:** Game được thiết kế cho mục đích giáo dục và giải trí. Người dùng có quyền chơi game, tương tác với các nội dung giáo dục và tham gia cộng đồng.
*   **Giới hạn sử dụng:** Không được phép sử dụng game hoặc bất kỳ phần nào của game (bao gồm mã nguồn, tài nguyên đồ họa, âm thanh) cho mục đích thương mại, sao chép, phân phối lại mà không có sự cho phép rõ ràng từ Quách Thành Long.

### 2. Nội dung và Quyền sở hữu trí tuệ
*   Tất cả nội dung trong game và trên website (bao gồm đồ họa, âm thanh, mã nguồn, văn bản, logo, thương hiệu) là tài sản độc quyền của Quách Thành Long hoặc các nhà cung cấp tài nguyên đã được cấp phép.
*   Mọi hành vi sao chép, phân phối, sửa đổi hoặc sử dụng trái phép các tài sản này đều bị nghiêm cấm và có thể chịu trách nhiệm pháp lý.

### 3. Dữ liệu Người dùng và Quyền riêng tư
*   Website và Game có thể thu thập dữ liệu ẩn danh về cách sử dụng (ví dụ: số lượt truy cập trang, thời gian chơi game) nhằm mục đích cải thiện trải nghiệm người dùng và hiệu suất của game.
*   Mọi thông tin cá nhân (nếu có, ví dụ: địa chỉ email khi liên hệ) sẽ được bảo mật theo chính sách quyền riêng tư và không được chia sẻ với bên thứ ba khi chưa có sự đồng ý của người dùng.
*   **Floating Chat AI (ChronoBot):** Mọi cuộc trò chuyện với ChronoBot đều nhằm mục đích cung cấp thông tin về game và giáo dục. Không khuyến khích chia sẻ thông tin cá nhân nhạy cảm trong các cuộc trò chuyện này.

### 4. Trách nhiệm của Người dùng
*   Người dùng chịu trách nhiệm về mọi hành vi của mình khi truy cập và sử dụng website/game.
*   Không được thực hiện các hành vi gây hại, phá hoại, hoặc làm gián đoạn hoạt động của website/game.
*   Tuân thủ các quy tắc cộng đồng và tôn trọng các người chơi khác khi tương tác trong môi trường multiplayer hoặc các kênh cộng đồng.

### 5. Miễn trừ Trách nhiệm
*   Game và website được cung cấp "nguyên trạng" (as is) mà không có bất kỳ bảo đảm nào, dù rõ ràng hay ngụ ý. Quách Thành Long không chịu trách nhiệm về bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, hoặc do hậu quả phát sinh từ việc sử dụng hoặc không thể sử dụng game/website.
*   Hiệu suất của game có thể thay đổi tùy thuộc vào cấu hình thiết bị và kết nối internet của người dùng.

### 6. Thay đổi Điều khoản
*   Các điều khoản sử dụng này có thể được cập nhật hoặc sửa đổi bất cứ lúc nào. Người dùng được khuyến khích kiểm tra định kỳ để nắm bắt các thay đổi. Việc tiếp tục sử dụng website/game sau khi các thay đổi được công bố đồng nghĩa với việc bạn chấp nhận các điều khoản mới.

### 7. Liên hệ
*   Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ theo thông tin đã cung cấp trong phần README.md.

## 📧 Liên Hệ

Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với Quách Thành Long qua email: stephensouth1307@gmail.com

---

**Khám phá ChronoVerse và bắt đầu hành trình vũ trụ của bạn ngay hôm nay!**

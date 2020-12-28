import React from 'react';
import xpeakThumbnail from './resources/xpeak.png';
import xpeakIcon from './resources/xpeakIcon.png';
import hocvetThumbnail from './resources/hocvet.png';
import hocvetIcon from './resources/hocvetIcon.png';
import lotusLMSThumbnail from './resources/lotusLMS.png';
import lotusLMSIcon from './resources/lotusLMSIcon.png';
import lotusSISIcon from './resources/lotusSISIcon.png';
import lotusTestingIcon from './resources/lotusTestingIcon.png';
import lotusSISThumbnail from './resources/lotusSIS.png';
import lotusTestingThumbnail from './resources/lotusTesting.png';
import XpeakDetail from './detail-pages/xpeak';

const items = [
  {
    id: 'lotusLMS',
    name: 'Lotus LMS',
    description: 'Nền tảng học trực tuyến',
    icon: lotusLMSIcon,
    detailPage: (
      <XpeakDetail
        title="LotusLMS"
        subtitle="Nền tảng học trực tuyến"
        intro="LotusLMS là một nền tảng dạy và học trực tuyến giúp doanh nghiệp và nhà trường online hóa công tác đào tạo. LotusLMS hỗ trợ tối đa giáo viên trong việc thiết kế bài giảng, bài tập, bài kiểm tra/bài thi một cách dễ dàng. LotusLMS giúp học viên học theo lộ trình giáo viên đã thiết kế hoặc tham gia lớp học ảo, kết nối trực tiếp với giáo viên và các học viên khác thông qua môi trường internet. LotusLMS cung cấp đầy đủ các môi trường web, moblile app (iOS, Android) giúp học viên có thể học/ôn bài ở bất kỳ đâu chỉ với chiếc smart phone có kết nối internet."
        src="http://lotuslms.com"
      />
    ),
    thumbnail: lotusLMSThumbnail,
  },
  {
    id: 'lotusTesting',
    name: 'Lotus Testing',
    description: 'Nền tảng thi trực tuyến',
    icon: lotusTestingIcon,
    detailPage: (
      <XpeakDetail
        title="Lotus Testing"
        subtitle="Nền tảng thi trực tuyến"
        intro="LotusTesting là một nền tảng thi trực tuyến, giúp doanh nghiệp và nhà trường hiện đại hóa công tác thi, chấm thi bằng máy tính. LotusTesting giúp dễ dàng quản lý ngân hàng câu hỏi, ngân hàng đề thi, hỗ trợ lên đến 100,000 học viên thi đồng thời. Ngân hàng câu hỏi và ngân hàng đề thi cũng như kết quả thi của học viên được bảo mật tối đa. LotusTesting tích hợp các công nghệ chống gian lận và chống gián đoán đoạn khi làm bài thi, tạo tự yên tâm cho đơn vị tổ chức thi và công bằng đối với các học viên tham gia thi."
        src="http://englishtesting.net"
      />
    ),
    thumbnail: lotusTestingThumbnail,
  },
  {
    id: 'lotusSIS',
    name: 'Lotus SIS',
    description: 'Hệ thống quản lý đào tạo',
    icon: lotusSISIcon,
    detailPage: (
      <XpeakDetail
        title="Lotus SIS"
        subtitle="Hệ thống quản lý đào tạo"
        intro="LotusSIS là hệ thống quản lý đào tạo phù hợp với các trường đại học, cao đẳng, dạy nghề và trường cấp 3. LotusSIS quy trình hóa toàn bộ công việc quản lý đào tạo của trường như Quản lý tuyển sinh, Quản lý sinh viên, Quản lý giáo viên, Quản lý học thuật, Sắp xếp thời khóa biểu, Quản lý thi trực tuyến (khảo thí), Quản lý điểm, Quản lý học phí và Cổng thông tin học tập cho giáo viên, học viên và phụ huynh, …. LotusSIS rất mạnh mẽ đáp ứng hàng chục nghìn người sử dụng đồng thời trên web, mobile app. LotusSIS rất linh hoạt cho phép thay đổi, cấu hình để phù hợp với môi trường đào tạo tại Việt Nam và Quốc tế."
        src="http://sis.lotuslms.com"
      />
    ),
    thumbnail: lotusSISThumbnail,
  },
  {
    id: 'xpeak',
    name: 'Xpeak',
    icon: xpeakIcon,
    detailPage: (
      <XpeakDetail intro="Xpeak là ứng dụng học tiếng Anh giao tiếp trên web và điện thoại di động, giúp người Việt có thể giao tiếp tiếng Anh tự tin sau 3 tháng." />
    ),
    description: 'Học tiếng Anh giao tiếp',
    thumbnail: xpeakThumbnail,
  },
  {
    id: 'hocvet',
    name: 'Học vẹt',
    description: 'Học từ vựng tiếng Anh',
    icon: hocvetIcon,
    detailPage: (
      <XpeakDetail
        title="Học vẹt"
        subtitle="Học từ vựng tiếng Anh"
        intro="Học vẹt là ứng dụng học từ vựng trên điện thoại di động vô cùng thú vị và dễ gây “nghiện” cho người học. Nếu bạn đã quá chán với các học từ vựng thông thường thì Học vẹt là ứng dụng dành cho bạn, Học vẹt sẽ giúp bạn tăng tốc 4-5 lần học từ vựng tiếng Anh trong thời gian ngắn."
        src="http://hocvet.vn"
      />
    ),
    thumbnail: hocvetThumbnail,
  },
];

export default items;

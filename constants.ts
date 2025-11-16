import { EditTechnique, EditTechniqueDetails } from './types';

export const UI_TEXTS = {
    guideTitle: "프롬프트 가이드 및 전략",
};

export const EDIT_TECHNIQUES: EditTechniqueDetails[] = [
    {
        key: EditTechnique.AddRemove,
        label: '요소 추가/삭제',
        parts: [
            { type: 'text', value: '제공된 원본 이미지에 ' },
            { 
                type: 'input', 
                id: 'element', 
                placeholder: '예: 선글라스',
                suggestions: ['선글라스', '모자', '날개', '배경에 무지개', '귀여운 고양이', '커피잔']
            },
            { type: 'text', value: ' 항목이 ' },
            { type: 'select', id: 'action', options: ['추가', '제거'] },
            { type: 'text', value: '된 상태.' },
        ],
    },
    {
        key: EditTechnique.Inpaint,
        label: '영역 변경 (인페인팅)',
        parts: [
            { type: 'text', value: '제공된 이미지에서 ' },
            { 
                type: 'input', 
                id: 'target', 
                placeholder: '예: 자동차 색상',
                suggestions: ['눈 색깔', '자동차 색상', '하늘', '셔츠의 무늬', '머리 색깔']
            },
            { type: 'text', value: ' 영역만 ' },
            { 
                type: 'input', 
                id: 'replacement', 
                placeholder: '예: 빨간색',
                suggestions: ['파란색', '빨간색', '노을 지는 하늘', '스트라이프 패턴', '금발']
            },
            { type: 'text', value: '(으)로 변경됨. 나머지 부분은 원본과 동일.' },
        ],
    },
    {
        key: EditTechnique.StyleTransfer,
        label: '스타일 변환',
        parts: [
            { type: 'text', value: '제공된 이미지의 구도를 유지한 채 ' },
            { 
                type: 'input', 
                id: 'style', 
                placeholder: '예: 수채화',
                suggestions: ['반 고흐', '피카소', '수채화', '애니메이션', '사이버펑크', '스팀펑크', '유화']
            },
            { type: 'text', value: ' 스타일로 변환된 결과.' },
        ],
    },
    {
        key: EditTechnique.Restore,
        label: '이미지 복원',
        parts: [
            { type: 'text', value: '제공된 원본 이미지를 복원하고 선명하게 만든 상태.' },
        ],
    },
    {
        key: EditTechnique.Colorize,
        label: '흑백 채색',
        parts: [
            { type: 'text', value: '제공된 원본 흑백 이미지를 자연스럽게 채색한 상태.' },
        ],
    },
    {
        key: EditTechnique.Upscale,
        label: '해상도 향상',
        parts: [
            { type: 'text', value: '제공된 원본 이미지의 해상도를 높이고 디테일을 살린 상태.' },
        ],
    },
];

export const PROMPT_GUIDE_SECTIONS = [
    {
        title: "기본 원칙",
        description: "Gemini 이미지 생성의 핵심은 단순히 키워드를 나열하는 것이 아니라, 장면을 상세히 묘사하는 것입니다. 모델의 강점은 깊이 있는 언어 이해력이므로, 설명적인 문장이 더 좋은 결과를 만듭니다.",
    },
    {
        title: "1. 실사형 장면",
        description: "사실적인 이미지를 만들려면 카메라 각도, 렌즈 유형, 조명, 세부사항 등 사진 용어를 사용하세요.",
        template: `[촬영 유형]의 [주제] 사진, [행동 또는 표정], [환경]을 배경으로 함. 
[조명 설명]으로 장면을 비추어 [분위기] 분위기를 연출. 
[카메라/렌즈 정보]로 촬영하여 [주요 질감 및 디테일]을 강조. 
이미지는 [가로 세로 비율] 형식이어야 함.`
    },
    {
        title: "2. 세련된 삽화 및 스티커",
        description: "스티커, 아이콘 등을 만들 때는 스타일을 명시하고 투명 배경을 요청하는 것이 중요합니다.",
        template: `[스타일]의 [주제] 스티커, [주요 특징]과 [색상 팔레트]를 특징으로 함. 
디자인은 [선 스타일]과 [음영 스타일]을 가져야 함. 
배경은 투명해야 함.`
    },
    {
        title: "3. 이미지의 정확한 텍스트",
        description: "정확한 텍스트 렌더링을 위해서는 텍스트 내용, 글꼴 스타일, 전체 디자인을 명확히 지정해야 합니다.",
        template: `"[렌더링할 텍스트]"라는 텍스트가 [글꼴 스타일]로 포함된 [브랜드/컨셉]을 위한 [이미지 유형]을 만드세요. 
디자인은 [스타일 설명]이어야 하며, [색상 구성]을 사용하세요.`
    },
    {
        title: "4. 이미지 수정 프롬프트",
        description: "기존 이미지를 수정할 때는 변경할 요소와 그 방식을 구체적으로 지시하는 것이 효과적입니다.",
        template: `제공된 [주제]의 이미지를 사용하여, 장면에서 [요소]를 [추가/제거/수정]해주세요. 
변경 사항이 [통합 방식 설명]과 같이 자연스럽게 적용되도록 해주세요.`
    },
    {
        title: "권장 사항: 매우 구체적으로 작성하기",
        description: "세부 정보를 많이 제공할수록 제어력이 커집니다. '판타지 갑옷' 대신 '은박 무늬가 새겨진 화려한 엘프 판금 갑옷, 매의 날개 모양의 높은 칼라와 견갑'과 같이 구체적으로 작성하세요.",
    },
    {
        title: "권장 사항: 긍정적 프롬프트 사용",
        description: "'자동차가 없음'과 같이 부정을 사용하는 대신, '교통 흔적이 없는 텅 빈 거리'와 같이 긍정적인 표현을 사용하는 것이 더 좋은 결과를 낳습니다.",
    },
];
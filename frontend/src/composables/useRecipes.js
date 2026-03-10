// src/composables/useRecipes.js
import { ref } from 'vue';

export function useRecipes() {
    const recipes = ref([
        {
            id: 1,
            name: '番茄炒蛋',
            description: '经典家常菜，酸甜可口，营养丰富',
            mealType: '午餐',
            calories: 280,
            cookingTime: 15,
            protein: 18,
            carbs: 25,
            fat: 12,
            difficulty: '简单',
            image: 'https://materials.cdn.bcebos.com/images/6194632/40290b3794a628fff61a2896b38fe93b.jpeg'
        },
        {
            id: 2,
            name: '青椒肉丝',
            description: '色香味俱全的下饭菜，富含蛋白质',
            mealType: '午餐',
            calories: 320,
            cookingTime: 20,
            protein: 22,
            carbs: 28,
            fat: 14,
            difficulty: '中等',
            image: 'https://ts1.tc.mm.bing.net/th/id/R-C.f9d64c41c2e7d5d867a1ddcc297fe30b?rik=A5L8AiFLdeYyww&riu=http%3a%2f%2fn.sinaimg.cn%2fsinakd10023%2f607%2fw844h563%2f20220127%2f7ae0-a305faa3e87b948f0bc3fe7cd327ced2.png&ehk=LV3nXi4NoBDyXJGFYVMLfv0op8Kum76R%2byH4cuzEEHI%3d&risl=&pid=ImgRaw&r=0'
        },
        {
            id: 3,
            name: '红烧排骨',
            description: '传统中式菜肴，肉质酥烂，味道浓郁',
            mealType: '晚餐',
            calories: 450,
            cookingTime: 60,
            protein: 28,
            carbs: 15,
            fat: 28,
            difficulty: '中等',
            image: 'https://ts1.tc.mm.bing.net/th/id/R-C.2d36bfc74b2855eaa3a82aeef60454ed?rik=ZBHVrHYlZKHVgA&riu=http%3a%2f%2fp6.qhmsg.com%2ft01531d24004a848362.jpg&ehk=gaIttDp1H41G2nxKarZbNqR%2fQcboo%2bMAucUtc3dlftI%3d&risl=&pid=ImgRaw&r=0'
        },
        {
            id: 4,
            name: '清炒时蔬',
            description: '健康清淡的素菜，保留蔬菜原味',
            mealType: '晚餐',
            calories: 80,
            cookingTime: 10,
            protein: 3,
            carbs: 10,
            fat: 4,
            difficulty: '简单',
            image: 'https://preview.qiantucdn.com/58pic/20230718/0058PIC58PICj55SstW5IcEd9_PIC2018_PIC2018.jpg!w1024_new_small_1'
        },
        {
            id: 5,
            name: '宫保鸡丁',
            description: '经典川菜，酸甜微辣，鸡肉嫩滑',
            mealType: '午餐',
            calories: 380,
            cookingTime: 25,
            protein: 25,
            carbs: 30,
            fat: 18,
            difficulty: '中等',
            image: 'https://materials.cdn.bcebos.com/images/60200061/57f231070d1608e83b39254db6276693.jpeg'
        },
        {
            id: 6,
            name: '鱼香肉丝',
            description: '川菜代表作，鱼香味型，咸甜酸辣兼备',
            mealType: '午餐',
            calories: 350,
            cookingTime: 20,
            protein: 20,
            carbs: 35,
            fat: 16,
            difficulty: '中等',
            image: 'https://materials.cdn.bcebos.com/images/39275436/26649005146a34c5ba54ba695f238091.jpeg'
        },
        {
            id: 7,
            name: '麻婆豆腐',
            description: '四川名菜，麻辣鲜香，豆腐嫩滑',
            mealType: '午餐',
            calories: 320,
            cookingTime: 18,
            protein: 18,
            carbs: 22,
            fat: 18,
            difficulty: '中等',
            image: 'https://img.tukuppt.com/png_preview/00/25/27/2OK6rwqzxA.jpg!/fw/780'
        },
        {
            id: 8,
            name: '蒜蓉粉丝蒸扇贝',
            description: '海鲜佳肴，蒜香浓郁，粉丝入味',
            mealType: '晚餐',
            calories: 280,
            cookingTime: 20,
            protein: 22,
            carbs: 20,
            fat: 12,
            difficulty: '中等',
            image: 'https://ts1.tc.mm.bing.net/th/id/R-C.027f640cbc3824bfe0c5dde75f411a54?rik=JlmcerOjcSS2Mg&riu=http%3a%2f%2fcp2.douguo.net%2fupload%2fcaiku%2fe%2f2%2fc%2fyuan_e26ab005f8565c6189d09dd92e8fb13c.jpg&ehk=o710TTjTZZBMDJKC2bSyrJYpKsN%2fGb1HeDCoW3P2g4E%3d&risl=&pid=ImgRaw&r=0'
        },
        {
            id: 9,
            name: '糖醋里脊',
            description: '经典糖醋口味，外酥里嫩，酸甜适口',
            mealType: '午餐',
            calories: 420,
            cookingTime: 30,
            protein: 26,
            carbs: 45,
            fat: 18,
            difficulty: '中等',
            image: 'https://ts1.tc.mm.bing.net/th/id/R-C.1508dd6e5f58f897f5efada7766dca47?rik=y8S7%2fYx%2bE5UT9w&riu=http%3a%2f%2f5b0988e595225.cdn.sohucs.com%2fimages%2f20190802%2f42c5927671164e47be8f744bf6d81ca0.jpeg&ehk=YTbIIErVCbW%2fhoDBrCBQNc%2fpJtLf1fFzov12o323JhE%3d&risl=&pid=ImgRaw&r=0'
        },
        {
            id: 10,
            name: '干煸四季豆',
            description: '川式做法，干香入味，下饭佳品',
            mealType: '午餐',
            calories: 260,
            cookingTime: 20,
            protein: 12,
            carbs: 20,
            fat: 16,
            difficulty: '中等',
            image: 'https://ts1.tc.mm.bing.net/th/id/R-C.b645b653dbfe144abc037e5c08369af1?rik=3kbVZb36D7Hzkw&riu=http%3a%2f%2fn.sinaimg.cn%2fsinacn14%2f279%2fw1151h728%2f20181013%2fca18-hmivixm5108516.jpg&ehk=CDHOAYYIquxE2%2fKSwj7H109SyfqAEjPgUI2t8RjResA%3d&risl=&pid=ImgRaw&r=0'
        },
        {
            id: 11,
            name: '回锅肉',
            description: '川菜之首，肥而不腻，香辣可口',
            mealType: '午餐',
            calories: 480,
            cookingTime: 25,
            protein: 24,
            carbs: 15,
            fat: 32,
            difficulty: '中等',
            image: 'https://img.tukuppt.com/png_preview/00/14/75/d7qvXepZ0C.jpg!/fw/780'
        },
        {
            id: 12,
            name: '水煮牛肉',
            description: '川菜经典，麻辣鲜香，牛肉滑嫩',
            mealType: '晚餐',
            calories: 420,
            cookingTime: 30,
            protein: 30,
            carbs: 15,
            fat: 28,
            difficulty: '中等',
            image: 'https://cp1.douguo.com/upload/caiku/d/1/7/yuan_d1f3f501678164bc9882dc74c50c1297.jpg'
        },
        {
            id: 13,
            name: '酸辣土豆丝',
            description: '家常快手菜，酸辣开胃，脆爽可口',
            mealType: '午餐',
            calories: 180,
            cookingTime: 12,
            protein: 4,
            carbs: 30,
            fat: 6,
            difficulty: '简单',
            image: 'https://materials.cdn.bcebos.com/images/14093207/2e962e54dcd657eb2232e27c4479024b.jpeg'
        },
        {
            id: 14,
            name: '葱油拌面',
            description: '简单美味的主食，葱香四溢',
            mealType: '早餐',
            calories: 380,
            cookingTime: 15,
            protein: 12,
            carbs: 55,
            fat: 14,
            difficulty: '简单',
            image: 'https://ts1.tc.mm.bing.net/th/id/R-C.81867ce28df0bbe3f38c4cf3db2cff81?rik=jMaQS0ak2EzTFw&riu=http%3a%2f%2fi2.chuimg.com%2fd947f25e87e611e6a9a10242ac110002_2592w_3872h.jpg%3fimageView2%2f2%2fw%2f660%2finterlace%2f1%2fq%2f90&ehk=YlUmbWAS%2fXwS%2fAEgML9HsmxYNMeZ1djK8uwSfhDT678%3d&risl=&pid=ImgRaw&r=0'
        },
        {
            id: 15,
            name: '西红柿牛腩煲',
            description: '营养丰富的炖菜，汤汁浓郁，老少皆宜',
            mealType: '晚餐',
            calories: 400,
            cookingTime: 90,
            protein: 28,
            carbs: 30,
            fat: 18,
            difficulty: '困难',
            image: 'https://cp1.douguo.com/upload/caiku/c/8/7/yuan_c854014dd9b8110019e2f19d6f4a2b37.jpg'
        }
    ]);

    return {
        recipes
    };
}

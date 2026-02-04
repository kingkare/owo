function initFooterAnimal() {
    const footerBar = document.querySelector('#footer-bar');
    if (!footerBar) return;

    // 1. 防止 Pjax 重复堆叠
    const existingAnimal = document.getElementById('footer-animal');
    if (existingAnimal) {
        existingAnimal.remove();
    }

    // 2. 创建容器
    const footerAnimal = document.createElement('div');
    footerAnimal.id = 'footer-animal';
    
    // 动物图片
    footerAnimal.innerHTML = `
        <img class="animal-img"
            src="https://cdn.jsdelivr.net/gh/kingkare/owo/img/chongwu.webp"
            alt="动物" />
    `;

    // 3. 插入到页脚上方
    footerBar.insertAdjacentElement('beforebegin', footerAnimal);

    // 4. 样式实现
    if (!document.getElementById('footer-animal-style')) {
        const style = document.createElement('style');
        style.id = 'footer-animal-style';
        style.textContent = `
            #footer-animal {
                position: relative;
                width: 100%;
                line-height: 0;
                margin-bottom: -1px; /* 消除与下方页脚可能的微小缝隙 */
                
                /* 设置墙体背景：平铺、底部对齐、高度匹配 */
                background: url("https://cdn.jsdelivr.net/gh/kingkare/owo/img/qiangti.webp") repeat-x bottom;
                background-size: auto 36px; /* 36px 是墙体的高度，可根据效果微调 */
            }

            .animal-img {
                position: relative;
                display: block;
                margin: 0 auto;
                max-width: min(974px, 100vw);
                height: auto;
                z-index: 1;
            }

            /* 确保页脚紧贴 */
            #footer-bar {
                margin-top: 0 !important;
            }

            /* 夜间模式滤镜 */
            [data-theme=dark] #footer-animal {
                filter: brightness(.8);
            }

            /* 移动端适配墙体高度 */
            @media screen and (max-width: 768px) {
                #footer-animal {
                    background-size: auto 24px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// 初始化执行
initFooterAnimal();

// 适配 Pjax 切换页面
document.addEventListener('pjax:success', initFooterAnimal);


// const tabsGroups = Array.from(document.querySelectorAll('[data-tabs]'));
// tabsGroups.forEach(tabsGroup => {
//     const tabsGroupName = tabsGroup.getAttribute('data-tabs');
//     const tabsButtons = Array.from(document.querySelectorAll(`[data-tabs="${tabsGroupName}"] button[data-tab-target]`));
//     const tabDetailEls = Array.from(document.querySelectorAll(`[data-tabs="${tabsGroupName}"] [data-tab-group]`))

//     tabsButtons.forEach((tabButton) => {
//         const tabDetailId = tabButton.getAttribute('data-tab-target');

//         tabButton.addEventListener('click', (e) => {
//             if (tabDetailId === 'all') {
//                 tabsGroup.classList.add('view-all');
//             } else {
//                 tabsGroup.classList.remove('view-all');

//             }

//             tabsButtons.forEach(button => {
//                 if(button === tabButton) {
//                     button.classList.add('selected')
//                 } else {
//                     button.classList.remove('selected')
//                 }
//             })

//             tabDetailEls.forEach(tab => {
//                 if (tab.getAttribute('id') === tabDetailId) {
//                     tab.classList.add('selected');
//                 } else {
//                     tab.classList.remove('selected');
//                 }
//             });
//         })

//     });


// })

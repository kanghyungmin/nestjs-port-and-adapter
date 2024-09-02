// function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
//     let retList : ListNode | null = null
//     let circular : ListNode | null = null
//     let valL1 = (l1==null ?  0 : l1.val)
//     let valL2 = (l2==null ?  0 : l2.val)
//     let ascend = 0

//     while(l1 != null || l2 !== null ) {
//         if(!retList) {
//             let val1 =0
//             if((valL1 + valL2 + ascend) >=10) {
//                 val1 = (valL1 + valL2 + ascend) % 10 
//                 ascend = 1
//             } else {
//                 val1 = valL1 +valL2
//                 console.log(`val1=${val1}`)
//             }
//             retList = new ListNode(val1, null)
//             circular = retList
//         }else {
//             if((valL1 + valL2 + ascend) >= 10) {
//                 const val = (valL1 + valL2 + ascend) % 10 
//                 ascend = 1
//                 circular.next = new ListNode(val, null)
//                 }
//             else {
//                     circular.next = new ListNode(valL1+valL2+ascend, null)
//                     ascend =0
//                 }
//             circular = circular.next
//         }
//         if(l1==null)
//             valL1 =0
//         else {
//             l1 = l1.next;
//             valL1 = (l1==null?  0 : l1.val)
//         }
//         if(l2 == null)
//             valL2= 0
//         else {
//             l2 = l2.next;
//             valL2 = (l2==null?  0 : l2.val)
//         }
//     } 
//     if(retList == null)
//         retList = new ListNode(0, null)
//     if(ascend == 1) {
//         circular.next = new ListNode(1, null)
//     }

//     return retList
// };
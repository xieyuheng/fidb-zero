---
title: a note from fc
---

xyh： 文件系统如果已经实现了从 id （path）快速找到文件，是不是 DB 就可以依赖文件系统的这个功能了？

fc： 是的，reiser 和 btrfs 的 inode table 本質就是個 kv 數據庫的 btree …… 不過 kv 數據庫支援給定 prefix
的 scan key ，文件系統只能用固定文件夾結構模擬，以及現代 kv 數據庫是不是都已經過渡到 log structured merge tree 了

xyh： 是不是只有 reiser 和 btrfs 是如此，但是 zfs 和 ext4 不是？

fc： ext4 和 xfs 是（足夠大的）每個文件夾內單獨一棵自平衡樹，xfs 是 btree ，ext4 是 htree
。每個文件夾單獨一棵樹的問題在於自平衡樹需要足夠大之後才能發揮它算法上的時空複雜度優勢，文件夾太小導致樹太小的時候實現上的常數級開銷可能蓋過自平衡樹的性能優勢，然後
ext4 在文件夾不夠大的時候用傳統 ext2 的數據結構。 reiser3 是整個文件系統的 inode table 在一棵 b*tree裏， btrfs
是整個子卷的 inode table 和文件夾樹結構都在同一棵 cow b-tree 裏。zfs 的文件夾和對象屬性用的 ZAP
甚至不是自平衡樹，就是個hash索引樹。

xyh： fs 的 API 是不是没有 transection 相关的功能？比如 删除某个文件 + 创建某个文件 变成一个 transection。

（自己研究一下吧）

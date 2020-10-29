const Data = [
  { id: 1 },
  { id: 2, before: 1 },
  { id: 3, after: 1 },
  { id: 5, first: true },
  { id: 6, last: true },
  { id: 7 },
  { id: 8 },
];

// [5, 2, 1, 3, 6, 7, 8];

function parseData(arr) {
  const Data = [];
  const action = {
    before: function (item) {
      return Data.findIndex((dItem) => dItem === item.before);
    },
    after: function (item) {
      return Data.findIndex((dItem) => dItem === item.after) + 1;
    },
    first: function () {
      return 0;
    },
  };
  arr.forEach((item) => {
    let index = Data.length;
    item.before && (index = action["before"](item));
    item.after && (index = action["after"](item));
    item.first && (index = action["first"](item));
    Data.splice(index, 0, item.id);
  });
  return Data;
}

console.info(parseData(Data));

const data = [
  { id: 2, parentId: 1, label: "2" },
  { id: 1, parentId: null, label: "1" },
  { id: 3, parentId: 1, label: "3" },
  { id: 4, parentId: 3, label: "4" },
];

function convert2Tree(arr) {
  let result = null;
  const nodeIndex = new Map();
  arr.forEach((item) => {
    nodeIndex.set(item.id, item);
  });
  arr.forEach((item) => {
    if (!item.parentId) {
      result = nodeIndex.get(item.id);
    }
    const itemCache = nodeIndex.get(item.parentId);
    if (itemCache) {
      itemCache.children = itemCache.children || [];
      itemCache.children.push(item);
    }
  });
  return result;
}

console.log(convert2Tree(data));

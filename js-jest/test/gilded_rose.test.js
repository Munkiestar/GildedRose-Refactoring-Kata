const { Shop, Item } = require("../src/gilded_rose");
function getItems() {
  return [
    new Item("+5 Dexterity Vest", 10, 20),
    new Item("Aged Brie", 2, 0),
    new Item("Elixir of the Mongoose", 5, 7),
    new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),

    // This Conjured item does not work properly yet
    new Item("Conjured Mana Cake", 3, 6),
  ];
}

describe("Gilded Rose", function () {
  it("should execute tests", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
  it("should not allow item quality  to be negative", function () {
    const items = getItems();
    items[0].quality = 1;
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
  it("should degrade quality twice as fast after sellIn", function () {
    const items = getItems();
    items[0].sellIn = 1;
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(15);
  });
  it("should increase quality for aged brie", function () {
    const items = getItems();
    const agedBrie = items[1];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(agedBrie.quality).toBe(2);
  });
  it("should increase quality for aged brie by one regardless of sellin", function () {
    const items = getItems();
    const agedBrie = items[1];
    agedBrie.sellIn = -1;
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(agedBrie.quality).toBe(4);
  });
  it("should increase quality for backstage passes", function () {
    const items = getItems();
    const backstagePass = items[5];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(backstagePass.quality).toBe(22);
  });
  it("should increase quality by two for backstage passes in 10 or less days", function () {
    const items = getItems();
    const backstagePass = items[6];
    backstagePass.quality = 10;
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(backstagePass.quality).toBe(14);
  });
  it("should increase quality by three for backstage passes in 5 or less days", function () {
    const items = getItems();
    const backstagePass = items[6];
    backstagePass.sellIn = 5;
    backstagePass.quality = 10;
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(backstagePass.quality).toBe(16);
  });
  it("should set quality to zero for backstage passes whose time has passed", function () {
    const items = getItems();
    const backstagePass = items[6];
    backstagePass.sellIn = -1;
    backstagePass.quality = 20;
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(backstagePass.quality).toBe(0);
  });
  it("should not change quality for sulfuras", function () {
    const items = getItems();
    const sulfuras = items[3];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(sulfuras.quality).toBe(80);
  });
  it("should never increase quality over 50", function () {
    const items = getItems();
    const agedBrie = items[1];
    agedBrie.quality = 50;
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(agedBrie.quality).toBe(50);
  });
  it("should never allow a negative quality", function () {
    const items = getItems();
    const agedBrie = items[1];
    agedBrie.quality = -1;
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(agedBrie.quality).toBe(1);
  });
  it("should decrease quality twice as fast for conjured items", function () {
    const items = getItems();
    const conjuredItem = items[8];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(conjuredItem.quality).toBe(4);
  });
});

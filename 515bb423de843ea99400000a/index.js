class PaginationHelper {
	constructor(collection, itemsPerPage) {
		// The constructor takes in an array of items and a integer indicating how many
		// items fit within a single page
		this.collection = collection;
		this.itemsPerPage = itemsPerPage;
	}
	itemCount() {
		// returns the number of items within the entire collection
		return this.collection.length;
	}
	pageCount() {
		// returns the number of pages
		return Math.ceil(this.itemCount() / this.itemsPerPage);
	}
	pageItemCount(pageIndex) {
		// returns the number of items on the current page. page_index is zero based.
		// this method should return -1 for pageIndex values that are out of range
		if (pageIndex >= 0 && pageIndex <  this.pageCount() - 1) return this.itemsPerPage;
		if (pageIndex >= 0 && pageIndex == this.pageCount() - 1) return this.itemCount() % this.itemsPerPage != 0 ? this.itemCount() % this.itemsPerPage : this.itemsPerPage;
		return -1;
	}
	pageIndex(itemIndex) {
		// determines what page an item is on. Zero based indexes
		// this method should return -1 for itemIndex values that are out of range
		if (itemIndex < 0 || itemIndex >= this.itemCount()) return -1;
		return Math.floor(itemIndex / this.itemsPerPage);
	}
}

describe("Tests suite", () => {
	const { strictEqual } = require('chai').assert;

	function doTest(instance, methodName, expected, ...args) {
		const actual = instance[methodName](...args);
		strictEqual(actual, expected, `for ${methodName}(${args.join(', ')})`);
	}

	it("sample test : 24 items with 10 per page", () => {
		const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
		const helper = new PaginationHelper(collection, 10)

		doTest(helper, 'pageCount', 3);
		doTest(helper, 'itemCount', 24);

		doTest(helper, 'pageItemCount', 10, 1);
		doTest(helper, 'pageItemCount', 4, 2);
		doTest(helper, 'pageItemCount', -1, 3);
		doTest(helper, 'pageIndex', -1, 40);

		doTest(helper, 'pageIndex', 2, 22);
		doTest(helper, 'pageIndex', 0, 3);
		doTest(helper, 'pageIndex', 0, 0);
		doTest(helper, 'pageIndex', -1, -1);
		doTest(helper, 'pageIndex', -1, -23);
		doTest(helper, 'pageIndex', -1, -15);
	});

	it ('empty collection', () => {
		const empty = new PaginationHelper([], 10);

		doTest(empty, 'pageCount', 0);
		doTest(empty, 'itemCount', 0);
		doTest(empty, 'pageIndex', -1, 0);
		doTest(empty, 'pageItemCount', -1, 0);
	});
});
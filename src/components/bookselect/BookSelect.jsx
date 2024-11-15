import bookData from "../../bookData.json";
import "./BookSelect.css";
import toast from "react-hot-toast";

const BookSelect = ({ selectedBooks, setSelectedBooks }) => {
  const handleAddBook = () => {
    const lastSelectedBook = selectedBooks[selectedBooks.length - 1];

    if (lastSelectedBook.bookId.length <= 0) {
      return toast("👿 Complete open slot before creating new one 👿");
    }

    const filteredBookOptions = lastSelectedBook?.options?.filter(
      (o) => o.id != lastSelectedBook.bookId
    );

    lastSelectedBook.disabled = true;

    setSelectedBooks([
      ...selectedBooks,
      {
        bookId: "",
        chapters: [],
        chaptersOptions: [],
        options: [...filteredBookOptions],
      },
    ]);
  };

  const handleSelectedBook = (e, index) => {
    const updatedBooks = selectedBooks.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          bookId: e.target.value,

          chaptersOptions:
            bookData[Number.parseInt(e.target.value) - 1]?.chapters,
        };
      }
      return item;
    });

    setSelectedBooks(updatedBooks);
  };

  const hadleChaptersChange = (e, index) => {
    const updatedBooks = selectedBooks.map((item, idx) => {
      const options = [...e.target.selectedOptions];
      const values = options.map((option) => option.value);
      if (idx === index) {
        return {
          ...item,
          chapters: values,
        };
      }
      return item;
    });
    setSelectedBooks(updatedBooks);
  };

  const removeBook = () => {
    const updatedBooks = selectedBooks;

    updatedBooks.pop();

    updatedBooks[updatedBooks.length - 1].disabled = false;

    console.log(updatedBooks);
    setSelectedBooks([...updatedBooks]);
  };
  return (
    <div className="bookselectdivswrapper container">
      {selectedBooks.map((sb, index) => {
        return (
          <div className="bookselectdiv" key={index}>
            <div className="bookselectelement">
              <p>Select Book</p>
              <select
                name="select"
                id=""
                key={index}
                onChange={(e) => handleSelectedBook(e, index)}
                disabled={sb.disabled}
              >
                <option value=""></option>
                {sb?.options?.map((o, i) => {
                  return (
                    <option value={o.id} key={i}>
                      {o.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="bookselectelement">
              <p>Select Chapters</p>
              <select
                name=""
                id=""
                multiple
                onChange={(e) => hadleChaptersChange(e, index)}
                disabled={sb.disabled}
                className="bookchapterselect"
              >
                {sb?.chaptersOptions?.map((chapter, i) => {
                  return (
                    <option
                      value={chapter.id}
                      key={i}
                      selected={sb.chapters.includes(chapter.id)}
                    >
                      {chapter.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              onClick={removeBook}
              disabled={
                selectedBooks.length <= 1 || selectedBooks[index].disabled
              }
            >
              -
            </button>
          </div>
        );
      })}

      <button onClick={handleAddBook}>+</button>
    </div>
  );
};

export default BookSelect;
